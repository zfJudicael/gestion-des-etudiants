<template>
  <div class="bg-gray-100 m-4 rounded p-4">
    <div>
      <p class="inline">Classe : </p>
      <select name="classe" id="classe" class="inline" v-model="idClasseSelected" @change="listEtudiants = etudiantStore.getEtudiantByIdClasse(idClasseSelected)">
        <option :value="classek" v-for="classek in idClasse">{{ classek }}</option>
      </select>
    </div>

    <table class="mx-auto mt-20 block w-fit max-h-96 overflow-y-scroll overflow-x-hidden">
      <thead class="bg-teal-400 text-white sticky top-0 z-10">
        <tr>
          <th>Numéro</th>
          <th>Nom</th>
          <th>Prénoms</th>
          <th>Mathématique</th>
          <th>Physique</th>
          <th>Moyenne</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!listEtudiants.length">
          <td colspan="7">Vide</td>
        </tr>
        <tr v-else v-for="etudiant in listEtudiants">
          <td>{{ etudiant.numEt }}</td>
          <td>{{ etudiant.nomEt }}</td>
          <td>{{ etudiant.prenoms }}</td>
          <td>{{ etudiant.note_math }}</td>
          <td>{{ etudiant.note_pc }}</td>
          <td>{{ etudiant.moyenne }}</td>
          <td class="text-blue-400 text-center hover:cursor-pointer hover:text-blue-600 hover:scale-125"
            @click="toggleVisibe(etudiant.numEt, etudiant.nomEt, etudiant.prenoms, etudiant.note_math, etudiant.note_pc)">
            <i class="fa-regular fa-pen-to-square"></i>
          </td>
          <td class="text-red-400 text-center hover:cursor-pointer hover:text-red-600  hover:scale-125"
            @click="confirmDelete(etudiant.numEt)">
            <i class="fa-regular fa-trash-can"></i>
          </td>
        </tr>
        <tr class="sticky bottom-0">
          <td colspan="8" class="hover:cursor-pointer hover:bg-blue-600 bg-blue-500 text-white" @click="visible = true">
            Ajouter étudiant</td>
        </tr>
      </tbody>
    </table>

    <div class="mt-10 p-4 border w-fit border-black rounded">
      <div class="flex">
        <p class=" font-bold">Nombre total étudiants : </p>
        <p>{{ listEtudiants.length }}</p>
      </div>
      <div class="flex">
        <p class=" font-bold">Moyenne minimale : </p>
        <p>{{ getMin }}</p>
      </div>
      <div class="flex">
        <p class=" font-bold">Moyenne maximale : </p>
        <p>{{ getMax }}</p>
      </div>
      <div class="flex">
        <p class=" font-bold">Nombre d'étudiants admis : </p>
        <p>{{ admis }}</p>
      </div>
      <div class="flex ">
        <p class=" font-bold">Nombre d'étudiants redoublants : </p>
        <p>{{ redoublants }}</p>
      </div>
    </div>
    <Dialog v-model:visible="visible" modal header="Ajout d'un étudiant" :style="{ width: '25rem' }">
      <form @submit="createEtudiant">
        <div class="flex items-center gap-3 mb-3">
          <label for="nom" class="font-semibold w-24">Nom :</label>
          <input type="text" id="nom" autocomplete="off" class="bg-gray-200 p-1 rounded" v-model="etudiant.nomEt"
            required>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="prenoms" class="font-semibold w-24">Prénoms :</label>
          <input type="text" id="prenoms" autocomplete="off" class="bg-gray-200 p-1 rounded" v-model="etudiant.prenoms">
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="note_math" class="font-semibold w-44">Note mathématique :</label>
          <input type="number" id="note_math" autocomplete="off" class="bg-gray-200 p-1 rounded" min="0" max="20"
            v-model="etudiant.note_math" required>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="note_pc" class="font-semibold w-44">Note physique :</label>
          <input type="number" id="note_pc" autocomplete="off" class="bg-gray-200 p-1 rounded" min="0" max="20"
            v-model="etudiant.note_pc" required>
        </div>

        <div class="flex justify-end gap-2">
          <input type="button" value="Annuler" @click="visible = false"
            class="text-red-600 hover:bg-red-600 hover:text-white p-2 hover:cursor-pointer rounded">
          <input type="submit" value="Sauvegarder"
            class="p-2 bg-blue-600 text-white rounded hover:cursor-pointer  hover:bg-blue-500">
        </div>
      </form>
    </Dialog>

    <Dialog v-model:visible="visibleModify" modal :header="`Modification pour l'étudiant ${etudiantToUpdate.num}`"
      :style="{ width: '25rem' }">
      <form @submit="updateEtudiant">
        <div class="flex items-center gap-3 mb-3">
          <label for="nom" class="font-semibold w-24">Nom :</label>
          <input type="text" id="nom" autocomplete="off" class="bg-gray-200 p-1 rounded" v-model="etudiantToUpdate.nom"
            required>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="prenoms" class="font-semibold w-24">Prénoms :</label>
          <input type="text" id="prenoms" autocomplete="off" class="bg-gray-200 p-1 rounded"
            v-model="etudiantToUpdate.prenoms">
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="note_math" class="font-semibold w-44">Note mathématique :</label>
          <input type="number" id="note_math" autocomplete="off" class="bg-gray-200 p-1 rounded" min="0" max="20"
            v-model="etudiantToUpdate.note_math" required>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <label for="note_pc" class="font-semibold w-44">Note physique :</label>
          <input type="number" id="note_pc" autocomplete="off" class="bg-gray-200 p-1 rounded" min="0" max="20"
            v-model="etudiantToUpdate.note_pc" required>
        </div>

        <div class="flex justify-end gap-2">
          <input type="button" value="Annuler" @click="visibleModify = false"
            class="text-red-600 hover:bg-red-600 hover:text-white p-2 hover:cursor-pointer rounded">
          <input type="submit" value="Sauvegarder"
            class="p-2 bg-blue-600 text-white rounded hover:cursor-pointer  hover:bg-blue-500">
        </div>
      </form>
    </Dialog>
    <Toast position="bottom-right" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useEtudiantStore } from '../stores/etudiant.store';
import { useClasseStore } from '../stores/classe.store'
import Dialog from 'primevue/dialog';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { reactive } from 'vue';

const etudiantStore = useEtudiantStore()
const classeStore = useClasseStore()
const listEtudiants = ref([])
const idClasse = ref([])
const idClasseSelected = ref('')
onMounted(async () => {
  try {
    await classeStore.selectClasse()
    idClasse.value = classeStore.getIdClasse
    if (idClasse.value.length > 0) idClasseSelected.value = idClasse.value[0]

    await etudiantStore.selectEtudiant()
    listEtudiants.value = etudiantStore.getEtudiantByIdClasse(idClasseSelected.value)
  } catch (error) {
    console.log('Error ', error.message);
  }
})

const visible = ref(false)
const toast = useToast()
const confirm = useConfirm()
const etudiant = reactive({
  nomEt: '',
  prenoms: '',
  note_pc: 0,
  note_math: 0,
})
const createEtudiant = async (event) => {
  event.preventDefault()
  visible.value = false;
  let result;
  try {
    result = await etudiantStore.createEtudiant(etudiant.nomEt, etudiant.prenoms, etudiant.note_math, etudiant.note_pc, idClasseSelected.value)
  } catch (error) {
    result = error
  }
  if (result.success) {
    try {
      await etudiantStore.selectEtudiant()
      listEtudiants.value = etudiantStore.getEtudiantByIdClasse(idClasseSelected.value)
    } catch (error) {
      console.log('Error ', error.message);
    }
    toast.add({ severity: 'info', summary: 'Succès', detail: result.message, life: 3000 });

  } else {
    toast.add({ severity: 'error', summary: 'Erreur', detail: result.message, life: 3000 });
  }
  etudiant.nomEt = ''
  etudiant.prenoms = ''
  etudiant.note_pc = 0
  etudiant.note_math = 0
}

//Delete etudiant
const confirmDelete = (numEt) => {
  confirm.require({
    message: 'Voulez vous vraiment la suprimmer?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'text-red-600 p-2 hover:outline hover:outline-1 hover:outline-red-600',
    rejectLabel: 'Non',
    acceptClass: 'text-blue-600 hover:bg-blue-600 hover:text-white p-2',
    acceptLabel: 'Oui',
    accept: () => {
      deleteEtudiant(numEt)
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejecté', detail: 'Vous avez rejeté la suppression', life: 3000 });
    }
  });
};

const deleteEtudiant = async (id) => {
  let result;
  try {
    result = await etudiantStore.deleteEtudiant(id)
    listEtudiants.value = etudiantStore.getEtudiantByIdClasse(idClasseSelected.value)
  } catch (err) {
    result = err
  }
  if (result.success) {
    toast.add({ severity: 'info', summary: 'Succès', detail: result.message, life: 3000 });
  } else {
    toast.add({ severity: 'error', summary: 'Erreur', detail: result.message, life: 3000 });
  }
}


// Modify etudinat
const etudiantToUpdate = reactive({
  num: '',
  nom: '',
  prenoms: '',
  note_math: 0,
  note_pc: 0
})
const visibleModify = ref(false)

const toggleVisibe = (num, nom, prenoms, note_math, note_pc) => {
  etudiantToUpdate.num = num
  etudiantToUpdate.nom = nom
  etudiantToUpdate.prenoms = prenoms
  etudiantToUpdate.note_math = note_math
  etudiantToUpdate.note_pc = note_pc
  visibleModify.value = true
}

const updateEtudiant = async (event) => {
  event.preventDefault()
  visibleModify.value = false
  let result;
  try {
    result = await etudiantStore.updateEtudiant(etudiantToUpdate.num, etudiantToUpdate.nom, etudiantToUpdate.prenoms, etudiantToUpdate.note_math, etudiantToUpdate.note_pc)
    await etudiantStore.selectEtudiant()
    listEtudiants.value = etudiantStore.getEtudiantByIdClasse(idClasseSelected.value)
  } catch (error) {
    result = error
  }
  if (result.success) {
    toast.add({ severity: 'info', summary: 'Succès', detail: result.message, life: 3000 });
  } else {
    toast.add({ severity: 'error', summary: 'Erreur', detail: result.message, life: 3000 });
  }
}

const getMin = computed(()=>{
  let min = 0;
  let moyenne = []
  listEtudiants.value.map((etudiant)=>{
    moyenne.push(etudiant.moyenne)
  })
  if(moyenne.length > 0) min = Math.min(...moyenne)
  return min
})

const getMax = computed(()=>{
  let max = 0;
  let moyenne = []
  listEtudiants.value.map((etudiant)=>{
    moyenne.push(etudiant.moyenne)
  })
  if(moyenne.length > 0) max = Math.max(...moyenne)
  return max
})

const admis = computed(()=>{
  return listEtudiants.value.filter((etudiant)=>{
    return etudiant.moyenne >= 10
  }).length
})

const redoublants = computed(()=>{
  return listEtudiants.value.filter((etudiant)=>{
    return etudiant.moyenne < 10
  }).length
})

</script>