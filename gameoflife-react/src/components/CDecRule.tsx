import React from "react";
import { isBreakStatement } from "typescript";
import { IJRule, IJRuleUser, genJRule as RULE_ORIGINAL } from "../models/Matrix"

interface IState {
    user: IJRuleUser
}

interface IReducerArgs {
    (
        state: IState,
        action: {
            type: Action
            args?: {
                nsr?: number
            }
        },
    ): any
}

enum Action {
    nsr
}

const reducer: IReducerArgs = (state, action): any => {

    const args = action.args;

    const rule = state.user.ijRule;

    switch (action.type) {

        // case Action.nsr:
        //     rule.nsr = args?.nsr;
        //     break;

    }

    return { ...state };

};

interface IProps {
    ijUser: IJRuleUser
};
const CDecRule: React.FC<IProps> = ({ ijUser }) => {

    const [state, dispach] = React.useReducer(reducer, {
        ijUser: ijUser,
    });

    const rule = state.ijUser.ijRule as IJRule;


    const nsrCallback = (event: any) => {
        const value = parseInt(event.target.value);
        dispach({
            type: Action.nsr,
            args: { nsr: value },
        });
    };

    let renderScenarios = () => {
        let scenarios = [];
        for (let i = 0; i < rule.scenarios.length; i++) {
            const scen = rule.scenarios[i];

            let renderRequierments = () => {
                const req_list = [];
                for (let j = 0; j < scen.requierments.length; j++) {
                    const req = scen.requierments[j];

                    req_list.push(
                        <li key={ Math.random() } className="requierment" >
                            <label htmlFor="">Max: </label> <input type="number" value={req.max} /> <br />
                            <label htmlFor="">Min: </label> <input type="number" value={req.min} />
                        </li>
                    );
                }
                return (req_list);
            }

            scenarios.push(
                <li key={ Math.random() } >
                    <label htmlFor="">requiredState: </label> <input type="checkbox" checked={scen.requiredState} /> <br />
                    <label htmlFor="">isEnabled: </label> <input type="checkbox" checked={scen.isEnabled} />
                    <ul className="requierments">
                        {renderRequierments()}
                    </ul>

                    <label htmlFor="">on true; elabled:</label>
                    <input type="checkbox" checked={ scen.enableOnTrue } />
                     <label htmlFor=""> ; value: </label>
                    <input type="checkbox" checked={ scen.setOnTrue }  />
                    <br />

                    <label htmlFor="">on false; elabled:</label>
                    <input type="checkbox" checked={ scen.enableOnFalse } />
                    <label htmlFor=""> ; value: </label>
                    <input type="checkbox" checked={ scen.setOnFalse } />
                    <br />
                </li>
            )
        }
        return (scenarios);
    }

    return (
        <div
            className="CDecRule"
        >
            <h3>Evolution rulres:</h3>
            <form>
                <label htmlFor="">nsr: </label><input type="number" value={rule.nsr} onChange={nsrCallback} /><br />
                <ul className="scenarios" >
                    {renderScenarios()}
                </ul>
            </form>
        </div>
    );

};


export default CDecRule;