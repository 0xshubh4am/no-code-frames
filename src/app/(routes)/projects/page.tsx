// app/projects/components/ContractFunctionFrameGenerator.tsx

"use client";

import React, { useState } from "react";
import axios from "axios";

interface AbiFunction {
  type: string;
  stateMutability: string;
  name: string;
}

const ContractFunctionFrameGenerator: React.FC = () => {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [abi, setAbi] = useState<AbiFunction[] | null>(null);
  const [readFunctions, setReadFunctions] = useState<AbiFunction[]>([]);
  const [selectedFunctions, setSelectedFunctions] = useState<AbiFunction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchABI = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api-sepolia.basescan.org/api?module=contract&action=getabi&address=${contractAddress}&apikey=6JHTJ2RIUFUFUIE5SQS1AXM5BBMVVXHMYI`
      );
      if (response.data.status === "1") {
        const abi: AbiFunction[] = JSON.parse(response.data.result);
        setAbi(abi);
        const readFuncs = abi.filter(
          (item) => item.type === "function" && item.stateMutability === "view"
        );
        setReadFunctions(readFuncs);
      } else {
        setError("Contract not found or not verified");
      }
    } catch (error) {
      console.error("Error fetching ABI:", error);
      setError("Error fetching ABI. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFunctionSelect = (func: AbiFunction) => {
    if (selectedFunctions.length < 4 && !selectedFunctions.includes(func)) {
      setSelectedFunctions([...selectedFunctions, func]);
    }
  };

  const handleFunctionRemove = (func: AbiFunction) => {
    setSelectedFunctions(selectedFunctions.filter((f) => f !== func));
  };

  const copyURL = () => {
    const baseUrl = window.location.href.split("?")[0];
    const params = new URLSearchParams();
    selectedFunctions.forEach((func, index) => {
      params.append(`function${index + 1}`, func.name);
    });
    const urlWithParams = `${process.env.NEXT_PUBLIC_URL}/user/0x70312e915A94b19831FAc551F0E1D1f89BD3BBac`;
    navigator.clipboard
      .writeText(urlWithParams)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden mx-4">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            Contract Function Frame Generator
          </h1>
          <div className="mb-6">
            <label
              htmlFor="contract-address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contract Address
            </label>
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                id="contract-address"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="Enter contract address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={fetchABI}
                disabled={isLoading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 transition duration-150 ease-in-out"
              >
                {isLoading ? "Loading..." : "Fetch ABI"}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="flex flex-col md:flex-row gap-8">
            {readFunctions.length > 0 && (
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Available Read Functions:
                </h2>
                <div className="flex flex-wrap gap-3 max-h-96 overflow-y-auto pr-4 border border-gray-200 rounded-md p-4">
                  {readFunctions.map((func, index) => (
                    <button
                      key={index}
                      onClick={() => handleFunctionSelect(func)}
                      disabled={selectedFunctions.includes(func)}
                      className="px-4 py-2 text-left rounded-md bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-150 ease-in-out"
                    >
                      {func.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Selected Functions:
              </h2>
              {selectedFunctions.length === 0 ? (
                <p className="text-gray-500 italic">
                  No functions selected yet
                </p>
              ) : (
                <div>
                  <div className="flex flex-wrap gap-3 border border-gray-200 rounded-md p-4">
                    {selectedFunctions.map((func, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-indigo-100 px-3 py-2 rounded-md"
                      >
                        <span className="font-medium text-indigo-800 mr-2">
                          {func.name}
                        </span>
                        <button
                          onClick={() => handleFunctionRemove(func)}
                          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      onClick={copyURL}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                      Copy URL
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractFunctionFrameGenerator;
