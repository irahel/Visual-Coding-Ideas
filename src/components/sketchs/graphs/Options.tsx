import * as Popover from "@radix-ui/react-popover";
import { Faders, Minus, Plus } from "phosphor-react";
import { ChangeEventHandler, MouseEventHandler } from "react";
import ButtonOptions from "./ButtonOptions";

interface OptionsProps {
  numberOfStates: number;

  handleSetNumberOfStates: ChangeEventHandler<HTMLInputElement>;
  handleButtonNumberOfStates: MouseEventHandler<HTMLButtonElement>;

  numberOfStatesSignal: number;
  setNumberOfStatesSignal: Function;
}

function Options({
  numberOfStates,
  handleSetNumberOfStates,
  handleButtonNumberOfStates,
  numberOfStatesSignal,
  setNumberOfStatesSignal,
}: OptionsProps) {
  return (
    <div className="flex flex-col items-center">
      <Popover.Root>
        <Popover.Trigger
          className="bg-blue rounded-full
              flex w-11 h-11 items-center justify-center
              hover:bg-blue-hover"
        >
          <Faders className="" color="#10101A" size={22} />
        </Popover.Trigger>

        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content
            className="bg-blue opacity-80 rounded-3xl
                  py-8
                  px-10
                  border-2
                  border-t-0
                  border-opacity-80
                  border-white
                  flex flex-col items-center justify-center"
          >
            <Popover.Arrow className="fill-blue w-4 h-2" />
            <div>
              <div className="flex flex-col">
                <div className="flex flew-row">
                  <label
                    className="text-dark font-serif font-semibold flex"
                    htmlFor="nagents"
                  >
                    Agents:
                  </label>
                  <input
                    className="rounded-3xl text-center bg-dark text-white w-full flex ml-2"
                    id="nagents"
                    type="number"
                    step={10}
                    value={numberOfStates}
                    min={0}
                    max={2000}
                    onChange={handleSetNumberOfStates}
                    defaultValue={numberOfStates}
                  />
                </div>
                <div className="flex flex-row gap-2 mt-2 items-center justify-center w-full">
                  <button
                    id="numberOfStatesSignalBtn"
                    onClick={() => {
                      setNumberOfStatesSignal(numberOfStatesSignal * -1);
                    }}
                    className={`rounded-lg bg-blue  text-lg font-serif font-bold
                    border-2 border-dashed flex items-center justify-center py-1 px-2
                    ${
                      numberOfStatesSignal > 0
                        ? "text-green-900 border-green-900"
                        : "text-red-900 border-red-900"
                    }`}
                  >
                    {numberOfStatesSignal > 0 ? (
                      <Plus
                        size={18}
                        color={` ${
                          numberOfStatesSignal > 0 ? "#14532d" : "#7f1d1d"
                        }`}
                        weight="bold"
                      />
                    ) : (
                      <Minus
                        size={18}
                        color={` ${
                          numberOfStatesSignal > 0 ? "#14532d" : "#7f1d1d"
                        }`}
                        weight="bold"
                      />
                    )}
                  </button>
                  <ButtonOptions
                    text={"50"}
                    handleButtonNumberOfStates={handleButtonNumberOfStates}
                  />{" "}
                  <ButtonOptions
                    text={"100"}
                    handleButtonNumberOfStates={handleButtonNumberOfStates}
                  />
                  <ButtonOptions
                    text={"500"}
                    handleButtonNumberOfStates={handleButtonNumberOfStates}
                  />
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default Options;
