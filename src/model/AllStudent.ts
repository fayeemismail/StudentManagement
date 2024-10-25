import ListStudents from "./ListStudents";

interface List {
    list: ListStudents[],
    load(): void,
    save(): void,
    clearList(): void,
    addStudent(itemObj: ListStudents): void,
    editStudent(itemObj: ListStudents): void,
    removeStudent(id: string): void
}

export default class AllStudent implements List{

    static instance: AllStudent = new AllStudent()

    private constructor(private _list: ListStudents[] = []) {}

    get list(): ListStudents[]{
        return this._list
    }


    load(): void {
        
        const stotedList:   string | null = localStorage.getItem('myList')
        if(typeof stotedList !== 'string') return

        const parsedList: {_id: string, _name: string, _age: number, _course: string}[] = JSON.parse(stotedList)

        console.log(parsedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListStudents(itemObj._id, itemObj._name, itemObj._age, itemObj._course)
            AllStudent.instance.addStudent(newListItem)
        })

    }

    save(): void {
        console.log(JSON.stringify(this._list))
        localStorage.setItem('myList', JSON.stringify(this._list))
    }

    clearList(): void {
        this._list = []
        this.save()
    }

    addStudent(itemObj: ListStudents): void {
        this._list.push(itemObj)
        this.save()
    }

    removeStudent(id: string): void {
        this._list = this._list.filter(student => student.id !== id)
        this.save()
    }

    editStudent(itemObj: ListStudents): void {
        this._list.forEach(student => {
            if(student.id == itemObj.id){
                student.name = itemObj.name
                student.age = itemObj.age
                student.course = itemObj.course
            }
        })
        this.save()
    }

}