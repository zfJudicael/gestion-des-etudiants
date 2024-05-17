<template>
    <div class="flex">
        <Dialog v-model:visible="visible" modal :header="`Modification de la classe : ${classeToUpdate.oldIdClasse}`"
            :style="{ width: '25rem' }">
            <form @submit="UpdateClasse">
                <div class="flex items-center gap-3 mb-3">
                    <label for="classe" class="font-semibold">Classe :</label>
                    <input type="text" id="classe" autocomplete="off" class="bg-gray-200 p-1 rounded"
                        v-model="classeToUpdate.newIdClasse" required>
                </div>
                <p>Niveau :</p>
                <div class="ml-16">
                    <input type="radio" name="niveau" id="3eme" value="3ème" v-model="classeToUpdate.niveau" required>
                    <label for="3eme"> 3ème</label>
                </div>
                <div class="ml-16">
                    <input type="radio" name="niveau" id="4eme" value="4ème" v-model="classeToUpdate.niveau" required>
                    <label for="4eme"> 4ème</label>
                </div>
                <div class="ml-16">
                    <input type="radio" name="niveau" id="5eme" value="5ème" v-model="classeToUpdate.niveau" required>
                    <label for="5eme"> 5ème</label>
                </div>
                <div class="ml-16">
                    <input type="radio" name="niveau" id="6eme" value="6ème" v-model="classeToUpdate.niveau" required>
                    <label for="6eme"> 6ème</label>
                </div>
                <div class="flex justify-end gap-2">
                    <input type="button" value="Annuler" @click="visible = false"
                        class="text-red-600 hover:bg-red-600 hover:text-white p-2 hover:cursor-pointer rounded">
                    <input type="submit" value="Sauvegarder"
                        class="p-2 bg-blue-600 text-white rounded hover:cursor-pointer  hover:bg-blue-500">
                </div>
            </form>
        </Dialog>

        <div class="basis-2/3">
            <Toast position="bottom-right" />
            <table class="mx-auto mt-20 block w-fit max-h-96 overflow-y-scroll overflow-x-hidden">
                <thead class="bg-teal-400 text-white sticky top-0 z-10">
                    <tr>
                        <th class="w-32">Classe</th>
                        <th>Niveau</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="classe in listClasse">
                        <td>{{ classe.idClasse }}</td>
                        <td>{{ classe.niveau }}</td>
                        <td class="text-blue-400 text-center hover:cursor-pointer hover:text-blue-600 hover:scale-125"
                            @click="toggleVisibe(classe.idClasse, classe.niveau)">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </td>
                        <td class="text-red-400 text-center hover:cursor-pointer hover:text-red-600  hover:scale-125"
                            @click="confirmDelete(classe.idClasse)">
                            <i class="fa-regular fa-trash-can"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form basis-1/3 bg-gray-100 pt-14 ">
            <h1 class="text-center font-semibold text-xl border-b border-black">Nouveau</h1>
            <form @submit="submitForm" class="pt-4 ml-6">
                <div>
                    <label for="idClasse">Classe : </label>
                    <input type="text" id="idClasse" v-model="idClasse" class="p-1 rounded-md" required>
                </div>
                <p>Niveau :</p>
                <div class="ml-16">
                    <input type="radio" name="niveau" id="3eme" value="3ème" v-model="niveau" required>
                    <label for="3eme"> 3ème</label>
                </div>
                <div class="ml-16">
                    <input type="radio" name="niveau" id="4eme" value="4ème" v-model="niveau" required>
                    <label for="4eme"> 4ème</label>
                </div>
                <div class="ml-16">
                    <input type="radio" name="niveau" id="5eme" value="5ème" v-model="niveau" required>
                    <label for="5eme"> 5ème</label>
                </div>
                <div class="ml-16">
                    <input type="radio" name="niveau" id="6eme" value="6ème" v-model="niveau" required>
                    <label for="6eme"> 6ème</label>
                </div>


                <div class="mt-4 text-center">
                    <input type="submit" value="Confirmer"
                        class="bg-blue-600 hover:bg-blue-500 p-2 rounded text-white hover:cursor-pointer">
                    <input type="button" value="Annuler"
                        class="ml-2 outline outline-1 outline-red-600 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded text-blasck hover:cursor-pointer">
                </div>

                <div v-if="isLoading">
                    Loading...
                </div>
                <div class="response" v-if="!isResponseEmpty">
                    <Message v-if="response.success" severity="success" :closable="false">{{ response.message }}</Message>
                    <Message v-else severity="error" :closable="false">{{ response.message }}</Message>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClasseStore } from '../stores/classe.store'
import { reactive } from 'vue';

//////////////////////////////////////////////////
/////////////////////PrimeVue/////////////////////
//////////////////////////////////////////////////
import Message from 'primevue/message';
import Toast from "primevue/toast";
import Dialog from 'primevue/dialog';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
const confirm = useConfirm()
const toast = useToast()
const visible = ref(false)
//////////////////////////////////////////////////

const listClasse = ref([])
const idClasse = ref('')
const niveau = ref('')
const response = reactive({
    success: false,
    message: ''
})

const classeToUpdate = reactive({
    oldIdClasse: '',
    newIdClasse: '',
    niveau: ''
})

const classeStore = useClasseStore()
onMounted(async () => {
    try {
        listClasse.value = await classeStore.selectClasse()
    } catch (error) {
        console.log(error.message);
    }
})

const isLoading = ref(false)
const isResponseEmpty = ref(true)
const submitForm = async (event) => {
    event.preventDefault()
    let result;
    try {
        isLoading.value = true
        result = await classeStore.newClasse(idClasse.value.trim(), niveau.value)
        listClasse.value = classeStore.classes
        idClasse.value = ''
        niveau.value = ''
    } catch (err) {
        result = err
    } finally {
        isLoading.value = false
        isResponseEmpty.value = false
    }
    response.message = result.message
    response.success = result.success
}

//Delete class
const confirmDelete = (idClasse) => {
    confirm.require({
        message: 'Voulez vous vraiment la suprimmer?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'text-red-600 p-2 hover:outline hover:outline-1 hover:outline-red-600',
        rejectLabel: 'Non',
        acceptClass: 'text-blue-600 hover:bg-blue-600 hover:text-white p-2',
        acceptLabel: 'Oui',
        accept: () => {
            deleteClasse(idClasse)
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejecté', detail: 'Vous avez rejeté la suppression', life: 3000 });
        }
    });
};

const deleteClasse = async (id) => {
    let result;
    try {
        result = await classeStore.deleteClasse(id)
        listClasse.value = classeStore.classes
    } catch (err) {
        result = err
    }
    if (result.success) {
        toast.add({ severity: 'info', summary: 'Succès', detail: result.message, life: 3000 });
    } else {
        toast.add({ severity: 'error', summary: 'Erreur', detail: result.message, life: 3000 });
    }
}

//Update classe
const toggleVisibe = (idClasse, niveau) => {
    classeToUpdate.newIdClasse = idClasse
    classeToUpdate.oldIdClasse = idClasse
    classeToUpdate.niveau = niveau
    visible.value = true
}

const UpdateClasse = async (event) => {
    visible.value = false
    event.preventDefault()
    try {
        let result = await classeStore.updateClasse(classeToUpdate.oldIdClasse, classeToUpdate.newIdClasse, classeToUpdate.niveau)
        listClasse.value = classeStore.classes
        toast.add({ severity: 'info', summary: 'Succès', detail: result.message, life: 3000 });
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Erreur', detail: err.message, life: 3000 });
    }
}

</script>

<style>
@tailwind components;

@layer components {
    table {
        @apply text-center
    }

    th {
        @apply font-medium p-3
    }

    td, th {
        @apply border;
    }

    thead tr:hover {
        @apply cursor-default
    }

    tbody tr:nth-child(even) {
        @apply bg-gray-100;
    }

    td {
        @apply p-1;
    }
}</style>