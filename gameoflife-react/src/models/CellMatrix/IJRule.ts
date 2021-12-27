export interface IJRuleUser {
    ijRule: IJRule
}

export interface IJRule {
    nsr?: number, // neighbor Search Radius
    scenarios: IScenario[],
}

export interface IScenario {
    requiredState: boolean,
    isEnabled: boolean,

    requierments: IInterval[],

    setOnTrue: boolean,
    enableOnTrue: boolean,

    setOnFalse: boolean,
    enableOnFalse: boolean,
}

export interface IInterval {
    min: number,
    max: number,
}

// Vals
export const GET_clasic_IJRule = (): IJRule => {
    return {
        nsr: 1,
        scenarios: [
            {
                requiredState: true,
                isEnabled: true,
                requierments: [
                    {
                        min: 2,
                        max: 3,
                    }
                ],
                setOnTrue: true,
                enableOnTrue: true,

                setOnFalse: false,
                enableOnFalse: true,
            },
            {
                requiredState: false,
                isEnabled: true,
                requierments: [
                    {
                        min: 3,
                        max: 3,
                    }
                ],
                setOnTrue: true,
                enableOnTrue: true,

                setOnFalse: false,
                enableOnFalse: true,
            }
        ]
    }
}

export const NEW_IJRule = ():IJRule => {
    return {
        nsr: 1,
        scenarios: []
    };
};
export const NEW_IScenarios = (): IScenario => {
    return{
        requiredState: false,
        isEnabled: false,
        requierments: [],
        setOnTrue: false,
        enableOnTrue: false,
        setOnFalse: false,
        enableOnFalse:false
    };
}
export const NEW_IRequierments = (): IInterval => {
    return{
        min: 0,
        max: 0
    };
};