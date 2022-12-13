export default class Task{
    constructor(name) 
    {
        this.id = Math.floor(Math.random() * 1000);
        this.name = name
        this.active = true
    }
}