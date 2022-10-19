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

export function populateAgents(numberOfStates: number, width: number, height: number): Agent[]{
  const agents: Agent[] = [];

  for (let i = 0; i < numberOfStates; i++) {
    const x = range(0, width);
    const y = range(0, height);

    agents.push(new Agent(x, y));
  }

  return agents;
}