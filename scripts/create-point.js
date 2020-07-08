function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json() )
        .then( states => {

            for( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
    } )
}

populateUFs()

function getCities() {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch (url)
        .then( res => res.json() )
        .then( cities => {

            for( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Ítens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    //adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    //Verificae se existem items selecionados, se sim 
    //Pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item === itemId // Isso será true ou false
        return itemFound
    })

    //Se já estiver selecionado, tirar da selecao
    if(alreadySelected >= 0) {

        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != ItemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        //Se não estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId)
    }
    console.log(selectedItems)
    
    //Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}