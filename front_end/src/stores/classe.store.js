import { defineStore } from 'pinia'
import { nodeProjectAPI } from '../services/axios.services'

export const useClasseStore = defineStore('classeStore', {
    state: () => ({
        classes: []
    }),
    actions: {
        async selectClasse() {
            try {
                this.classes = (await nodeProjectAPI.get('/classe')).data
            } catch (error) {
                console.log('Error: ', error.message);
            }
            return this.classes
        },
        newClasse(idClasseVal, niveauVal) {
            return new Promise((resolve, reject) => {
                nodeProjectAPI.post('/classe/new', { idClasse: idClasseVal, niveau: niveauVal })
                    .then((response) => {
                        this.classes.push({idClasse: idClasseVal, niveau: niveauVal})
                        resolve(response.data)
                    })
                    .catch((error) => {
                        reject(error.response.data)
                    })
            })
        },
        deleteClasse(idClasse){
            return new Promise((resolve, reject)=>{
                nodeProjectAPI.delete(`/classe/${idClasse}`)
                        .then((response)=>{
                            this.classes = this.classes.filter((classe)=>{
                                return classe.idClasse != idClasse
                            })
                            resolve(response.data)
                        })
                        .catch((err)=>{
                            reject(err.response.data)
                        })
            })
        },
        updateClasse(oldIdClasseVal, newIdClasseVal, niveauVal){
            return new Promise((resolve, reject)=>{
                nodeProjectAPI.patch(`/classe/${oldIdClasseVal}`, {idClasse: newIdClasseVal, niveau: niveauVal})
                            .then((response)=>{
                                this.classes.map((classe)=>{
                                    if(classe.idClasse === oldIdClasseVal){
                                        classe.idClasse = newIdClasseVal
                                        classe.niveau = niveauVal
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
        getIdClasse(state){
            let idClasse = []
            state.classes.map((classe)=>{
                idClasse.push(classe.idClasse)
            })
            return idClasse;
        }
    }
})