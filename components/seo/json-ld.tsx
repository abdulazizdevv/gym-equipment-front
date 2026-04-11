import type { Organization, WebSite, WithContext } from "schema-dts"

export function JsonLd({ data }: { data: WithContext<Organization | WebSite | any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
