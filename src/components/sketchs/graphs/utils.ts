import { range } from "../../utils";
import { Agent } from "./Agent";

export function debounce(fn: Function, ms: number) {
    let timer: any;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(null, arguments);
      }, ms);
    };
}

export function populateAgents(numberOfStates: number, width: number, height: number, speedX: number, speedY: number, size: number): Agent[]{
  const agents: Agent[] = [];

  for (let i = 0; i < numberOfStates; i++) {
    const x = range(0, width);
    const y = range(0, height);

    agents.push(new Agent(x, y, speedX, speedY, size));
  }

  return agents;
}

export const handlerSetState = (
  event: React.ChangeEvent<HTMLInputElement>,
  setState: Function,
  max: number,
  min: number
) => {
  let value: number = parseInt(event.target.value);
  value = isNaN(value)? min :
            value > max ? max :
              value < min ? min : value;
  applyState(event, setState, value);
};

const applyState = (
  event: React.ChangeEvent<HTMLInputElement>,
  setState: Function,
  value: number
  ) => {
    setState(value);
    event.target.value = value.toString();
}