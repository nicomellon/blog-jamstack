import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

interface PostMetadata {
  title: string;
  date: string;
  slug: string;
}

const root = process.cwd();

export function getFiles(): string[] {
  return fs.readdirSync(path.join(root, 'markdown'));
}

export async function getFileBySlug(slug: string) {
  const mdxSource = fs.readFileSync(
    path.join(root, 'markdown', `${slug}.mdx`),
    'utf-8'
  );

  const { data, content } = await matter(mdxSource);
  const source = await serialize(content, {});
  // TODO add a library that will allow formatting of code in .mdx - mdx-pris ?

  return {
    source,
    frontMatter: {
      slug,
      ...data,
    },
  };
}

export function getAllFilesMetadata(): PostMetadata[] {
  const files = getFiles();

  //! figure out typing in the reduce's arguments
  return files.reduce((allPosts: any, postSlug) => {
    const mdxSource = fs.readFileSync(
      path.join(root, 'markdown', postSlug),
      'utf-8'
    );
    const { data } = matter(mdxSource);

    return [{ ...data, slug: postSlug.replace('.mdx', '') }, ...allPosts];
  }, []);
}
