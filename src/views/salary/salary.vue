<style scoped src="./salary.css"></style>

<script lang="ts" src="./salary.ts"></script>

<template>
<div class="background-feature d-flex flex-column">
    <Header />
    <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
        <MenuDashBoard class="col-2" />
        <div class="col-10 d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
            <div class="filter-container">
                <label for="filter-month">Filter by month</label>
                <select name="filter-month" class="button-outline filter-select">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr class="text-start">
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Worked days</th>
                        <th scope="col">Total salary</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr class="book-row text-start" v-for="(item, index) in employeeSalary" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item["name"] }}</td>
                        <td>{{ item["phone"] }}</td>
                        <td>{{ item["salary"] }}</td>
                        <td>{{ item["workedDays"] }}</td>
                        <td>
                            <input class="salary-total" type="number" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex flex-row justify-content-end">
                <button class="button-solid">Calculate salary</button>
            </div>
        </div>
    </div>
</div>
</template>
