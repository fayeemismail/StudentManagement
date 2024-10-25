export interface Item {
    id: string,
    name: string,
    age: number,
    course: string
}

export default class ListStudents implements Item{
    constructor(
        private _id: string = '',
        private _name: string = '',
        private _age: number = 0,
        private _course: string = ''
    ) {}

    get id(): string{
        return this._id
    }

    set id(id:string) {
        this._id = id
    }

    get name(): string{
        return this._name
    }

    set name(name:string){
        this._name =  name
    }

    get age(): number{
        return this._age
    }

    set age(age: number){
        this._age = age
    }

    get course(): string{
        return this._course
    }

    set course(course: string){
        this._course = course
    }

}