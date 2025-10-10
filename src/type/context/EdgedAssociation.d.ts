type ConcreteEdgedAssociation = {
    association: ConcreteAssociationIdOnly
    labelPosition: LabelPosition
}

type AbstractEdgedAssociation = {
    association: AbstractAssociationIdOnly
    labelPosition: LabelPosition
}

type EdgedAssociation = {
    association: ConcreteAssociationIdOnly | AbstractAssociationIdOnly
    labelPosition: LabelPosition
}