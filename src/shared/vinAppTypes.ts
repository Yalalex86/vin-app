export interface Result {
    Value: string | null
    ValueId: string | null
    Variable: string | null
    VariableId: number
}

export interface AllDataByVin {
    Count: number
    Message: string
    Results: Result[]
    SearchCriteria: string
}

export interface VehicleVariable {
    DataType: string
    Description: string
    GroupName: string
    ID: number
    Name: string
}