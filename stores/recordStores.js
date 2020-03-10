import { decorate, observable } from "mobx"

class Reports {
    brief= {}
}

const Report = decorate(Reports, {
    brief: observable
})

export const report = new Report()