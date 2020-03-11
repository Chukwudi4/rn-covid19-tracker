import { decorate, observable } from "mobx"

class Reports {
    brief= {}
    latest= []
}

const Report = decorate(Reports, {
    brief: observable,
    latest: observable
})

export const report = new Report()