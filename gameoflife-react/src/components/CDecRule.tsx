import React from "react";
import { IJRule, IJRuleUser, genJRule as RULE_ORIGINAL } from "../models/Matrix"
import returnJSX from "../ReactUtil/Jsx"

interface IState {
  user: IJRuleUser
}

interface IReducerArgs { // function
  (
    state: IState,

    action: {
      type: Action
      args?: {
        pairObjChild?:{
          obj: any,
          child: string,
          value: any;
        },
      }
    },

  ): any
}

enum Action {
  changeChildNumber
}

const reducer: IReducerArgs = (state, action) => {

  const args = action.args;
  const rule = state.user.ijRule;

  switch (action.type) {

    case Action.changeChildNumber:
      if( args?.pairObjChild ){
        let { obj , child, value } = args.pairObjChild;
        obj[child] = value;
      }
      break;

  }

  return { ...state };
};

interface IProps {
  ijUser: IJRuleUser
};

const CDecRule: React.FC<IProps> = ({ ijUser }) => {

  const [state, dispach] = React.useReducer(reducer, {
    user: ijUser,
  });

  const rule = state.user.ijRule as IJRule;

  const changeDispatch = ( parent: object, childStr: string, value: any ) => {
    dispach( { type: Action.changeChildNumber, args:{ pairObjChild:{ obj: parent, child: childStr, value: value } } } );
  };

  return (
    <div
      className="CDecRule"
    >
      <h3>Evolution rulres:</h3>
      <form>
        <label htmlFor="">
          nsr:
          <input type="number"
            value={rule.nsr}
            // onChange={(event: any) => { dispach({ type: Action.changeChildNumber, args: event.target.value }) }}
            onChange={(e: any) => { changeDispatch( rule,"nsr", e.target.value ) }}
          />
        </label>
        <ul className="scenarios">
          {returnJSX((): JSX.Element[] => {

            let scenarios = [];
            for (let i = 0; i < rule.scenarios.length; i++) {
              const scen = rule.scenarios[i];

              scenarios.push(
                <li>

                  <label htmlFor="">
                    requiredState:
                    <input type="checkbox"
                      checked={scen.requiredState}
                      onChange={ (e:any)=>{ changeDispatch(scen, "requiredState", e.target.checked) }}
                    />
                  </label>

                  <label htmlFor="">
                    isEnabled:
                    <input type="checkbox"
                      checked={scen.isEnabled}
                      onChange={ (e:any) => { changeDispatch(scen, "isEnabled", e.target.checked) } }
                    />
                  </label>
                  <ul className="requierments">
                    {returnJSX((): JSX.Element[] => {
                      const req_list = [];
                      for (let j = 0; j < scen.requierments.length; j++) {
                        const req = scen.requierments[j];

                        req_list.push(
                          <li key={Math.random()} className="requierment" >
                            <label htmlFor="">
                              Max:
                              <input type="number"
                                value={req.max}
                                onChange={ (e:any)=>{ changeDispatch( req, "max", e.target.value ) } }
                              />
                            </label> <br />
                            <label htmlFor="">
                              Min:
                              <input type="number"
                                value={req.min}
                                onChange={ (e:any)=>{ changeDispatch( req, "min", e.target.value ) } }
                              />
                            </label>
                          </li>
                        );

                      }
                      return (req_list);
                    })}
                  </ul>

                  <label htmlFor="">
                    ON TRUE | elabled:
                    <input type="checkbox"
                      checked={scen.enableOnTrue}
                      onChange={ (e:any) => { changeDispatch(scen, "enableOnTrue",e.target.checked) } }
                    />
                    | value:
                    <input type="checkbox" 
                      checked={scen.setOnTrue} 
                      onChange={ (e:any) => { changeDispatch(scen, "setOnTrue",e.target.checked) } }  
                    />
                  </label><br />

                  <label htmlFor="">
                    ON FALSE | elabled:
                    <input type="checkbox" checked={scen.enableOnFalse} onChange={ (e:any) => { changeDispatch(scen, "enableOnFalse",e.target.checked) } } />
                    | value
                    <input type="checkbox" checked={scen.setOnFalse} onChange={ (e:any) => { changeDispatch(scen, "setOnFalse",e.target.checked) } } />
                  </label><br />

                </li>
              )
            }
            return (scenarios);
          })}
        </ul>
      </form>
    </div>
  ); // renurn

}; // React Component

export default CDecRule;