<template>
    <div class="card">
      <h5>Pizzas</h5>
  
      <Button
        label="New Pizza"
        icon="pi pi-external-link"
        @click="visible = true"
        />
  
      <Dialog
        v-model:visible="visible"
        modal
        header="Pizza"
        :style="{ width: '50vw' }"
        class="p-fluid"
      >
        <label>Name</label>
        <InputText type="text" v-model="pizza.name" />

        <div class="field">
        <label class="mb-3">Ingredients</label>
        <div class="formgrid grid">
          <div
            class="field-radiobutton col-6"
            v-for="ingredient in ingredients"
            :key="ingredient.id"
          >
            <Checkbox :value="ingredient.id" v-model="checkedIngredients" />  
            <label for="ingredient1">{{ ingredient.name }}</label>
          </div>
        </div>
      </div>
  

        <button @click="savePizza()">Save</button>
      </Dialog>
  
      <DataTable :value="pizzas" >
        <Column field="id" header="ID" width="5px" style="max-width: 5px"></Column>
        <Column field="name" header="Name" style="max-width: 6rem"></Column>
        <Column field="totalPrice" header="Price" style="max-width: 6rem"></Column>
        <Column header="Pizzas">
          <template #body="slotProps">
            <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editPizza(slotProps.data)" /> -->
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="deletePizza(slotProps.data.id)" />
          </template>
        </Column>
      </DataTable>
      <!--pre>{{ pizzas }}</pre-->
      <!--
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pizzas in pizzas" :key="pizza.id">
            <td>{{ pizza.id }}</td>
            <td>{{ pizza.name }}</td>
            <td>
              <button>edit</button>
              <button>delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  -->
      <Toast />
    </div>
  </template>
  
  <script setup>
  // importaciones
  import { ref, onMounted } from "vue";
  import { useToast } from "primevue/usetoast";
  import Checkbox from 'primevue/checkbox';
  import axios from "axios"
  const url_base = "http://127.0.0.1:8000/api";
  
  const toast = useToast();
  
  // variables o estados reactivos
  const pizzas = ref([]);
  const pizza = ref({ name: "", totalPrice: "" });
  const ingredients = ref();
  const visible = ref(false);
  const checkedIngredients = ref([]);

  //const ingItem = ({ingredient_id: ""});
  //const ing = [];

  //const sarasa = ref([]);
  //const verdura = [];
  //const fruta = ({ingredient_id: ""});
  //const theCheckedIngredients = [];
  const test = [];

  
  // metodos o funciones
  onMounted(() => {
    getPizzas();
    getIngredients();
  });

  async function getPizzas() {
    axios.get(url_base+"/pizza").then(
      (res) => {
        const datos = res;
        pizzas.value = datos.data.data;
        ingredients.value = pizzas.value.ingredients;
      }
    );
  }

  async function getIngredients() {
    await axios.get(url_base+"/ingredient").then(
      (res) => {
        const datos = res;
        ingredients.value = datos.data;
      }
    );
  }

  async function savePizza() {
    try {
      //if (pizza.value.id) {
        checkedIngredients._rawValue.forEach(function(item, i) {
          const p = {
            ingredient_id: item,
          };
          test.push(p);
        });

        const objIngredients = {
            ingredients: test,
        };
        let obj = {"name": pizza.value.name};
        Object.assign(obj, objIngredients);   

        await axios.post("http://127.0.0.1:8000/api"+"/pizza", obj, {
                                                      headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json',

                                                      }
          }).then(
          (res) => {
            console.log("se guardo: ", res.data)
          })

          visible.value = false;
          pizza.value = { nombre: "" };
          toast.add({
            severity: "success",
            summary: "Added Pizza",
            detail: "Pizza has been added",
            life: 3000,
          });
        
          getPizzas();

          //window.location.reload();
        

      //}      
      /*else {
        await modificar(categoria.value, categoria.value.id);        
      }*/
    } catch (error) {
      alert(error);
    }
  }
  
  function editPizza(dataPizza) {
    pizza.value = dataPizza;
    visible.value = true;
  }
  
  async function deletePizza(id) {
    if (confirm("¿Are you sure you want to delete?")){
      await axios.delete(url_base+"/pizza/"+id, {
                                          headers: {
                                              'Accept': 'application/json',
                                              'Content-Type': 'application/json'
                                          }
      }).then(
      (res) => {
        console.log("Deleted: ", res.data)
      });

      getPizzas();
      toast.add({
        severity: "success",
        summary: "Pizza Deleted",
        detail: "Pizza has been deleted",
        life: 3000,
      });

      window.location.reload();
    }
  }
  </script>
  

<style>

.p-datatable .p-datatable-tbody > tr > td{
  padding: 2px 2px 2px 2px!important;
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;

}

  /*resizableColumns="true"*/

</style>