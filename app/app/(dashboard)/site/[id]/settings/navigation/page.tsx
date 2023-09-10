import { Accordion, AccordionHeader, AccordionBody } from "@tremor/react";
import Form from "@/components/form";
import { updateSite } from "@/lib/actions";


export default function SiteSettingsNavigation() {
  const dummyData = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Blog", link: "/blog" },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {dummyData.map((item, index) => (
        <Accordion key={index}>
          <AccordionHeader>{item.name}</AccordionHeader>
          <AccordionBody>
            <Form
              title="Link"
              description="The link for this navigation item."
              helpText="Please use a valid URL."
              inputAttrs={{
                name: "link",
                type: "text",
                defaultValue: item.link,
                placeholder: "/link",
              }}
              handleSubmit={updateSite}
            />
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}
