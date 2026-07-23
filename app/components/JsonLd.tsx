'use client';

interface SchemaData {
  [key: string]: any;
}

interface JsonLdProps {
  data: SchemaData;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
