<style scoped src="./salary.css"></style>

<script lang="ts" src="./salary.ts"></script>

<template>
<div class="background-feature d-flex flex-column">
    <Header />
    <div class="d-flex flex-row" style="height: calc( 100vh - 66px)">
        <MenuDashBoard class="col-2" />
        <div class="col-10 d-flex flex-column" style="padding:24px; gap:24px;overflow-y: scroll; overflow-x: hidden; z-index:1" v-motion-slide-left>
            <div class="w-100 d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <label for="require-working-days">Required working days:</label>
                    <input v-model="requiredWorkingDays" id="require-working-days" class="required-working-days mx-2" type="number" />
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr class="text-start">
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Coefficient</th>
                        <th scope="col">Worked days</th>
                        <th scope="col">Total salary</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr class="book-row text-start" v-for="(item, index) in employeeList" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ item["name"] }}</td>
                        <td>{{ item["phoneNumber"] }}</td>
                        <td>{{ item["user"]["salary"] }}</td>
                        <td v-if="item['user']['salaryScale']">{{ item["user"]["salaryScale"]["coefficient"] }}</td>
                        <td v-else>1</td>
                        <td>
                            <input v-model="employeeList[index].workedDays" class="worked-days" type="number" />
                        </td>
                        <td>
                            <input disabled class="salary-total" type="number" :value="item.monthSalary"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="d-flex flex-row justify-content-end" style="gap: 10px">
                <button v-if="isShowButtonSave" @click="handleSaveChanges" class="button-solid">Save</button>
                <button @click="handleCalculateSalary" class="button-solid">Calculate salary</button>
            </div>
        </div>
    </div>
</div>
</template>
