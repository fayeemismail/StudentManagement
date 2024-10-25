import './css/style.css'


import AllStudent from './model/AllStudent'
import ListStudents from './model/ListStudents'
import Template from './template/template'

const initApp = (): void => {

  const allStudent = AllStudent.instance
  const template = Template.instance

  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement

  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById('newStudent') as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    const ageInput = document.getElementById('age') as HTMLInputElement
    const ageEntry: number = parseInt(ageInput.value)
    if (ageEntry < 4) return


    const courseInput = document.getElementById('course') as HTMLInputElement
    const courseEntry: string = courseInput.value
    if (!courseEntry.length) return


    const itemId: number = allStudent.list.length ? parseInt(allStudent.list[allStudent.list.length - 1].id) + 1 : 1
    const newItem = new ListStudents(itemId.toString(), newEntryText, ageEntry, courseEntry)
    console.log('newitem', newItem)

    allStudent.addStudent(newItem)

    template.render(allStudent)

  })

  const editBtnSubmit = document.getElementById('editStudentForm') as HTMLFormElement
  editBtnSubmit.addEventListener('submit', () => {


    const id = document.getElementById('studentId') as HTMLInputElement
    const idText: string = id.innerHTML
    if (!idText) return

    const input = document.getElementById('studentName') as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    const ageInput = document.getElementById('studentAge') as HTMLInputElement
    const ageEntry: number = parseInt(ageInput.value)
    if (ageEntry < 4) return


    const courseInput = document.getElementById('studentCourse') as HTMLInputElement
    const courseEntry: string = courseInput.value
    if (!courseEntry.length) return

    const newItem = new ListStudents(idText, newEntryText, ageEntry, courseEntry)
    console.log('newitem', newItem)

    allStudent.editStudent(newItem)

    template.render(allStudent)

  })

  const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement
  clearItems.addEventListener('click', (): void => {
    allStudent.clearList()
    template.clear()
  })

  allStudent.load()
  template.render(allStudent)

}

document.addEventListener('DOMContentLoaded', initApp)