"use client";
import React, { useState, ChangeEvent } from "react";
import {
  TabGroup,
  TabList,
  Tab,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react";
import Image from "next/image";

interface NavItem {
  name: string;
  link: string;
  editable: boolean;
}

export default function SiteSettingsNavigation() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { name: "Home", link: "/", editable: false },
    { name: "About", link: "/about", editable: true },
    { name: "Contact", link: "/contact", editable: true },
    { name: "Blog", link: "/blog", editable: true },
  ]);

  const handleEdit = (index: number, field: "name" | "link", value: string) => {
    const updatedItems = [...navItems];
    updatedItems[index][field] = value;
    setNavItems(updatedItems);
  };

  return (
    <div className="flex h-full w-full">
      {/* Edit Section */}
      <div className="w-1/2 space-y-6 overflow-y-auto p-4">
        <h2 className="mb-4 text-xl">Edit Navigation</h2>
        {navItems.map((item, index) => (
          <Accordion key={index}>
            <AccordionHeader>{item.name}</AccordionHeader>
            <AccordionBody>
              <div className="space-y-2">
                <label>Name</label>
                <input
                  type="text"
                  value={item.name}
                  disabled={!item.editable}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleEdit(index, "name", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border p-2"
                />
                <label>Link</label>
                <input
                  type="text"
                  value={item.link}
                  disabled={!item.editable}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleEdit(index, "link", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border p-2"
                />
              </div>
            </AccordionBody>
          </Accordion>
        ))}
      </div>

      {/* Preview Section */}
      <div className="flex h-[500px] w-1/2 flex-col space-y-6 overflow-y-auto rounded-lg bg-white p-4 shadow">
        <h2 className="text-2xl font-semibold text-gray-800">Preview</h2>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-200 p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="inline-block h-8 w-8 overflow-hidden rounded-full align-middle">
              <Image
                alt="Dummy Logo"
                height={40}
                src="/empty-state.png"
                width={40}
              />
            </div>
            <span className="ml-3 inline-block truncate font-title font-medium">
              My Site
            </span>
          </div>
          <TabGroup>
            <TabList className="flex justify-center space-x-4">
              {navItems.map((item, index) => (
                <Tab
                  key={index}
                  className="rounded-lg px-4 py-2 text-gray-700 transition duration-200 hover:bg-gray-300 active:bg-gray-400"
                >
                  {item.name}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
