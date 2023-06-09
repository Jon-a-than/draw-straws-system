export default function (_: unknown, { slots }: { slots: { default?: () => JSX.Element } }) {
  return (
    <form flex="~ col items-stretch gap-4" text-center>
      {slots.default && slots.default()}
    </form>
  )
}
