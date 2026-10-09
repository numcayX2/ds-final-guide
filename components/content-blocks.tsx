import type { ContentBlock } from "@/content/types";
import { Box, Card, Callout, Flex, Heading, Text, Table, Badge, Code } from "@radix-ui/themes";
import { Reveal } from "./reveal";

/**
 * Renders one block of chapter copy powered by Radix Themes.
 */
export function ContentBlockView({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "prose":
      return (
        <Text as="p" size="3" className="leading-relaxed max-w-prose text-ink">
          {block.text}
        </Text>
      );

    case "definition":
      return (
        <Callout.Root color="orange" variant="surface" className="max-w-prose border-l-2">
          <Callout.Text>
            <Text size="1" weight="bold" className="font-mono uppercase tracking-wider block mb-1">
              {block.term}
            </Text>
            <Text size="2" color="gray" className="leading-relaxed">
              {block.text}
            </Text>
          </Callout.Text>
        </Callout.Root>
      );

    case "marker":
      return (
        <Card variant="surface" className="max-w-prose p-4">
          <Text size="3" weight="bold" color="orange">
            {block.text}
          </Text>
        </Card>
      );

    case "pitfall":
      return (
        <Callout.Root color="amber" variant="surface" className="max-w-prose border-l-4">
          <Callout.Text>
            <Text size="1" weight="bold" color="amber" className="uppercase tracking-widest block mb-1">
              จุดระวังข้อสอบ (Exam Trap)
            </Text>
            <Text size="3" weight="bold" className="block text-ink mb-1">
              {block.title}
            </Text>
            <Text size="2" color="gray" className="leading-relaxed">
              {block.text}
            </Text>
          </Callout.Text>
        </Callout.Root>
      );

    case "worked-example":
      return (
        <Card variant="surface" className="p-6 max-w-prose">
          <Flex align="center" justify="between" className="border-b border-rule pb-3 mb-4 gap-3">
            <Text size="3" weight="bold" className="text-ink">
              {block.title}
            </Text>
            <Badge variant="surface" color="gray">
              Worked Example
            </Badge>
          </Flex>
          <ol className="space-y-2 text-xs sm:text-sm text-ink-muted list-decimal pl-5">
            {block.steps.map((s, i) => (
              <li key={i} className="leading-relaxed">
                {s}
              </li>
            ))}
          </ol>
          <Flex align="center" justify="between" className="mt-5 pt-4 border-t border-rule gap-3">
            <Text size="2" color="gray">
              คำตอบ:
            </Text>
            <Text size="4" weight="bold" color="green" className="font-mono tnum">
              {block.answer}
            </Text>
          </Flex>
        </Card>
      );

    case "table":
      return (
        <Card variant="surface" className="p-4 sm:p-5 overflow-x-auto">
          {block.caption ? (
            <Text size="1" weight="bold" color="gray" className="block mb-3">
              {block.caption}
            </Text>
          ) : null}
          <Table.Root size="2" variant="surface">
            <Table.Header>
              <Table.Row>
                {block.headers.map((h, i) => (
                  <Table.ColumnHeaderCell key={i}>{h}</Table.ColumnHeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {block.rows.map((row, i) => (
                <Table.Row key={i}>
                  {row.map((cell, j) => (
                    <Table.Cell key={j} className="font-mono text-xs tnum">
                      {cell}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
      );

    case "formula":
      return (
        <Card variant="surface" className="p-3.5 max-w-prose">
          <Flex align="center" justify="between" gap="3">
            <Text size="2" color="gray">
              สูตรที่เกี่ยวข้องในคลังสูตร:
            </Text>
            <Code color="orange" weight="bold">
              {block.formulaId}
            </Code>
          </Flex>
        </Card>
      );

    case "image":
      return (
        <Card variant="surface" className="p-3 max-w-prose">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} className="w-full" />
          {block.caption ? (
            <Text size="1" color="gray" align="center" className="block mt-2">
              {block.caption}
            </Text>
          ) : null}
        </Card>
      );

    default: {
      const _never: never = block;
      return _never;
    }
  }
}

/** A chapter's worth of sections, rendered with staggered reveals. */
export function ChapterBody({
  sections,
}: {
  sections: Array<{ heading: string; body: ContentBlock[] }>;
}) {
  return (
    <div className="space-y-10">
      {sections.map((section, i) => (
        <Reveal as="section" key={section.heading} delay={Math.min(i * 60, 200)}>
          <Heading as="h2" size="5" weight="bold" className="border-b border-rule pb-3 mb-6 text-ink">
            {section.heading}
          </Heading>
          <div className="space-y-6">
            {section.body.map((block, k) => (
              <ContentBlockView key={k} block={block} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
