<template>
    <div class="row">
        <div class="justify-content-centermy-1 row">
            <b-form-fieldset horizontal label="Rows per page" class="col-6" :label-size="6">
                <b-form-select :options="[{text:5,value:5},{text:10,value:10},{text:15,value:15}]" v-model="perPage">
                </b-form-select>
            </b-form-fieldset>
            <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
                <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            </b-form-fieldset>
        </div>
        <!-- Main table element -->
        <b-table striped hover @items-provider="findAll(currentPage)" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
            <template slot="actions" scope="items">
                <b-btn size="sm" @click="this.alert(items.item.jobName)">Details</b-btn>
            </template>
        </b-table>

        <div class="justify-content-center row my-1">
            <b-pagination size="md" :total-rows="this.total" :per-page="perPage" v-model="currentPage" @input="testadddata(currentPage)" />
        </div>
    </div>
</template>

<script src="./test.js"></script>
