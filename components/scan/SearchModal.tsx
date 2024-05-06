import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IToken } from "../../utils/types";
import { showNotification, NotificationType } from "../../utils/notification";

import { Loader } from "../common/Loader";
import { TokenItem } from "../common/TokenItem";
import { SearchIcon } from "../common/SearchIcon";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setToken: (token: IToken | null) => void;
};

export const SearchModal = ({ open, setOpen, setToken }: Props) => {
  const cancelButtonRef = useRef(null);

  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [tokens, setTokens] = useState<IToken[]>([]);

  const selectToken = (selToken: IToken) => {
    setToken(selToken);
    setOpen(false);
  };

  const updateSearch = async (tokenVal: string) => {
    setSearch(tokenVal);
    setLoad(true);

    if (tokenVal.length > 1) {
      try {
        const reqResp = await axios.get(`api/tokenscan`, {
          params: {
            token: tokenVal,
          },
        });
        setTokens(reqResp.data);
      } catch (err) {
        setTokens([]);
        showNotification("Token scan failed", NotificationType.ERROR);
      }
    } else {
      setTokens([]);
    }

    setLoad(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="group flex w-full max-h-[44px] flex-row items-center rounded-xl border border-gray/10 px-2 transition-all duration-300 ease-in-out bg-gray-300">
                    <SearchIcon />
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="Search"
                      className="w-full border-0 placeholder:text-gray-500 focus:ring-0 bg-gray-300"
                      value={search}
                      onChange={(e) => updateSearch(e.target.value)}
                    />
                  </div>
                  <div className="h-64 overflow-x-auto mt-1">
                    {load ? (
                      <div className="flex flex-1 flex-col items-center">
                        <Loader />
                      </div>
                    ) : (
                      tokens.map((token: IToken) =>
                        token.address && token.address.length > 0 ? (
                          <TokenItem
                            key={token.address}
                            token={token}
                            clickFunc={selectToken}
                          />
                        ) : null
                      )
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
