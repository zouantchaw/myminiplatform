'use client';
import React, { useState, ChangeEvent } from "react";
import {
  TabGroup,
  TabList,
  Tab,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react";

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
    <div className="flex w-full h-full">
      {/* Edit Section */}
      <div className="w-1/2 p-4 space-y-6 overflow-y-auto">
        <h2 className="text-xl mb-4">Edit Navigation</h2>
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleEdit(index, "name", e.target.value)}
                  className="block w-full p-2 mt-1 border rounded-md"
                />
                <label>Link</label>
                <input
                  type="text"
                  value={item.link}
                  disabled={!item.editable}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleEdit(index, "link", e.target.value)}
                  className="block w-full p-2 mt-1 border rounded-md"
                />
              </div>
            </AccordionBody>
          </Accordion>
        ))}
      </div>

      {/* Preview Section */}
      <div className="w-1/2 p-4 bg-gray-100 flex flex-col items-center justify-center h-[500px]">
        <h2 className="text-xl mb-4">Navigation Preview</h2>
        <TabGroup>
          <TabList className="flex justify-center space-x-4">
            {navItems.map((item, index) => (
              <Tab key={index}>{item.name}</Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>
    </div>
  );
}
