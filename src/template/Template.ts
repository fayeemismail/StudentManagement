import AllStudent from "../model/AllStudent";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(allStudent: AllStudent): void
}

export default class Template implements DOMList{

    ul: HTMLUListElement;

    static instance: Template = new Template()

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(allStudent: AllStudent): void {
        this.clear()

        allStudent.list.forEach(item => {
            const li = document.createElement('li') as HTMLLIElement
            li.className = 'item'

            const id = document.createElement('p') as HTMLParagraphElement;
            id.id = 'studentId'
            id.textContent = item.id
            id.style.display = "none";
            li.append(id)

            const label1 = document.createElement('p') as HTMLParagraphElement;
            label1.textContent = item.name
            li.append(label1)

            const label2 = document.createElement('p') as HTMLParagraphElement;
            label2.textContent = item.course
            li.append(label2)

            const label3 = document.createElement('p') as HTMLParagraphElement;
            label3.innerText = item.age.toString()
            li.append(label3)

            const edit = document.createElement('button') as HTMLButtonElement
            edit.className = 'editButton'
            edit.textContent = 'Edit'
            edit.onclick = () => {
                console.log(id.innerHTML)
                const modal = document.getElementById('editStudentModal');
                if (modal) {
                    modal.style.display = 'block';
                };
                const newid = document.getElementById('studentId') as HTMLParagraphElement
                newid.style.display = 'none';
                if (newid) {
                    newid.innerHTML = item.id.toString();
                }
                const editName = document.getElementById('studentName') as HTMLInputElement;
                if (editName) {
                    editName.value = item.name;
                }
                const editAge = document.getElementById('studentAge') as HTMLInputElement;
                if (editAge) {
                    editAge.value = item.age.toString();
                }
                const editCourse = document.getElementById('studentCourse') as HTMLInputElement;
                if (editCourse) {
                    editCourse.value = item.course;
                }
            }
            li.append(edit)

            const button = document.createElement('button') as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click', () => {
                allStudent.removeStudent(item.id)
                this.render(allStudent)
            })

            // const editButton = document.getElementById("editStudent") as HTMLButtonElement
            // editButton.addEventListener('click', ()=> {
            //     const newid = document.getElementById('studentName')?.innerHTML
            //     const editName = document.getElementById('studentName') ;
            //     const editAge = document.getElementById('studentAge') as HTMLInputElement;
            //     const editCourse = document.getElementById('studentCourse') as HTMLInputElement;
            //     allStudent.editStudent({newid, })
            // })

            this.ul.append(li)

        });
    }

}