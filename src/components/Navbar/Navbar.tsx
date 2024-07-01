"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Image from "next/image";

const navigation = [
  { name: "Create frame", href: "/", current: true },
  //   { name: "profile", href: "/user/:address", current: false },
  //   { name: "Projects", href: "/projects", current: false },
  //   { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { address, isConnected } = useAccount();
  return (
    <Disclosure as="nav" className="bg-gray-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <a href="/">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={80}
                      height={80}
                      className="block h-8 w-auto"
                    />
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <>
                      {navigation.map((item) => {
                        // Check if the current path matches the item's href, including dynamic paths
                        const isCurrent =
                          location.pathname ===
                          (item.href === "/user/:address"
                            ? `/user/${address}`
                            : item.href);

                        return (
                          <a
                            key={item.name}
                            href={
                              item.href === "/user/:address"
                                ? `/user/${address}`
                                : item.href
                            }
                            className={classNames(
                              isCurrent
                                ? "bg-gray-300 text-black"
                                : "text-gray-700 hover:bg-gray-200 hover:text-black",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={isCurrent ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        );
                      })}
                    </>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-gray-50 p-1 text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {isConnected ? <ConnectButton /> : <ConnectButton />}
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-300 text-black"
                      : "text-gray-700 hover:bg-gray-200 hover:text-black",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
