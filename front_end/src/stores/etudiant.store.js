import { defineStore } from "pinia";
import { nodeProjectAPI } from "../services/axios.services";

export const useEtudiantStore = defineStore('etudiantStore', {
    state: ()=>({
        etudiants: []
    }),
    actions: {
        async selectEtudiant() {
            try {
                this.etudiants = (await nodeProjectAPI.get('/etudiant')).data
            } catch (error) {
                console.log('Error : ', error.message);
            }
            return this.etudiants
        },
        createEtudiant(nomEtVal, prenomsVal, note_mathVal, note_pcVal, classeVal) {
            return new Promise((resolve, reject)=>{
                nodeProjectAPI.post('/etudiant/new', 
                { nomEt: nomEtVal, prenoms: prenomsVal, note_math: note_mathVal, note_pc: note_pcVal, classe: classeVal }
                ).then((response)=>{
                    this.etudiants.push({ nomEt: nomEtVal, prenoms: prenomsVal, note_math: note_mathVal, note_pc: note_pcVal, classe: classeVal })
                    resolve(response.data)
                })
                .catch((err)=>{
                    reject(err.response.data)
                })
            })
        },
        deleteEtudiant(numEt){
            return new Promise((resolve, reject)=>{
                nodeProjectAPI.delete(`/etudiant/${numEt}`)
                            .then((response)=>{
                                this.etudiants = this.etudiants.filter((etudiant)=>{
                                    return etudiant.numEt != numEt
                                })
                                resolve(response.data)
                            })
                            .catch((err)=>{
                                reject(err.response.data)
                            })
            })
        },
        updateEtudiant(numEtVal, nomEtVal, prenomsVal, note_mathVal, note_pcVal){
            return new Promise((resolve, reject)=>{
                nodeProjectAPI.patch(`/etudiant/${numEtVal}`, 
                { nomEt: nomEtVal, prenoms: prenomsVal, note_math: note_mathVal, note_pc: note_pcVal })
                .then((response)=>{
                    this.etudiants.map((etudiant)=>{
                        if(etudiant.numEt == numEtVal){
                            etudiant.nomEt = nomEtVal
                            etudiant.prenoms = prenomsVal
                            etudiant.note_math = note_mathVal
                            etudiant.note_pc = note_pcVal
                        }
                    })
                    resolve(response.data)
                })
                .catch((err)=>{
                    reject(err.response.data)
                })
            })
        }
    },
    getters: {
        getEtudiantByIdClasse(state){
            return (idClasse)=> state.etudiants.filter((etudiant)=>{
                    return etudiant.classe === idClasse
            })
        }
    }
})