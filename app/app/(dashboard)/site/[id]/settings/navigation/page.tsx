'use client';
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  TabGroup,
  TabList,
  Tab,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react";
import {
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem,
  getNavigationItemFromSiteId
} from "@/lib/actions";
import Image from "next/image";

interface NavItemInput {
  name: string;
  link: string;
  editable: boolean;
  order: number;
  siteId: string; 
}

interface NavItem extends NavItemInput {
  id: string;
}

export default function SiteSettingsNavigation({
  params,
}: {
  params: { id: string };
}) {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
   
  useEffect(() => {
    const fetchNavigationItems = async () => {
      const items = await getNavigationItemFromSiteId(params.id);
      setNavItems(items);
    }
    fetchNavigationItems();
  }, []);

  const handleEdit = (index: number, field: "name" | "link", value: string) => {
    const updatedItems = [...navItems];
    updatedItems[index][field] = value;
    setNavItems(updatedItems);
  };

  const handleSave = async (index: number) => {
    const item = navItems[index];
    if (item.id) {
      await updateNavigationItem(item.id, item);
    } else {
      const response = await createNavigationItem(params.id, item as NavItemInput);
      if ("error" in response) {
        console.error(response.error);
      } else {
        const newItem = response;
        const updatedItems = [...navItems];
        updatedItems[index] = newItem;
        setNavItems(updatedItems);
      }
    }
  };

  const handleDelete = async (index: number) => {
    const item = navItems[index];
    if (item.id) {
      await deleteNavigationItem(item.id);
      const updatedItems = [...navItems];
      updatedItems.splice(index, 1);
      setNavItems(updatedItems);
    } else {
      console.error("Item ID is undefined");
    }
  };

  const handleAdd = () => {
    if (navItems.length < 4) {
      const newItem: NavItemInput = { 
        name: "New Link", 
        link: "#", 
        editable: true, 
        order: navItems.length, // default order
        siteId: params.id, // default siteId
      };
      setNavItems([...navItems, newItem as NavItem]); // type assertion since we know ID will be added later
    }
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
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleSave(index)}
                    className="truncate rounded-md bg-stone-100 px-2 py-1 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => handleDelete(index)}
                    className="truncate rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </AccordionBody>
          </Accordion>
        ))}
        {navItems.length < 4 && (
          <button onClick={handleAdd} className="truncate rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-600 transition-colors hover:bg-green-200">
            Add New Link
          </button>
        )}
      </div>

      {/* Preview Section */}
      <div className="flex h-[500px] w-1/2 flex-col space-y-6 overflow-y-auto rounded-lg bg-white p-4 shadow">
        <h2 className="text-2xl font-semibold text-gray-800">Preview</h2>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-200 p-4">
          <div className="mb-4 flex items-center space-x-4">
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
