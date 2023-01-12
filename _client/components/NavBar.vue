<template>
  <Disclosure
    as="nav"
    class="bg-gray-800 fixed left-0 right-0 top-0 z-10"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto"
              src="/favicon.svg"
              alt="Your Company"
            />
          </div>
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              activeClass="bg-gray-900 text-white"
              :class="[
                'text-gray-300 hover:bg-gray-700 hover:text-white',
                'px-3 py-2 rounded-md text-sm font-medium',
              ]"
              >{{ item.name }}</NuxtLink
            >
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center rounded-md border border-yellow-500 hover:bg-yellow-500/80 hover:border-yellow-500/80 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              <span class="md:inline hidden">To Do</span
              ><span class="md:hidden">New</span>
            </button>
          </div>
          <div class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
            <button
              type="button"
              class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton
                  class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="sr-only">Open user menu</span>
                  <UserIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <NuxtLink
                      :to="item.to"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >{{ item.name }}</NuxtLink
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink
                      to="/"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      @click="session.sessionLogout()"
                      >Sign out</NuxtLink
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="ml-4 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="block h-6 w-6"
                aria-hidden="true"
              />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
      <div class="border-t border-gray-700 pt-4 pb-3">
        <div class="flex items-center px-5 sm:px-6">
          <div class="flex-shrink-0">
            <UserIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">
              {{ session.currentSession.name }}
            </div>
            <!-- <div class="text-sm font-medium text-gray-400">
              {{ user.email }}
            </div> -->
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2 sm:px-3">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >{{ item.name }}</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import { PlusIcon } from "@heroicons/vue/20/solid";
import { initSessionStore } from "~~/store/sessionStore";

const session = initSessionStore();

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", to: "/" },
  { name: "Calendar", to: "/calendar" },
];
const userNavigation = [
  { name: "Your Profile", to: "/profile" },
  { name: "Settings", to: "settings" },
];
</script>
