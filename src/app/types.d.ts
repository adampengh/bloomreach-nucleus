interface PageProps {
  params: Promise<{ rest: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
