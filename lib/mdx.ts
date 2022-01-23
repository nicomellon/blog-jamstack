import fs from 'fs';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { title } from 'process';

interface FileMetadata {
  title: string;
  date: string;
  slug: string;
}
const rootPath = process.cwd();
const markdownPath = path.join(rootPath, 'markdown');

export async function getFiles() {
  try {
    const files = await readdir(markdownPath);
    return files.map((file) => path.parse(path.join(markdownPath, file)));
  } catch (err) {
    console.error(err);
  }
}

export async function getFileBySlug(slug: string) {
  try {
    const mdxSource = await readFile(
      path.join(markdownPath, `${slug}.mdx`),
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
  } catch (err) {
    console.error(err);
  }
}

export async function getAllFilesMetadata() {
  try {
    const files = await getFiles();
    const filesMetadata: FileMetadata[] = files!.map((file) => {
      const mdxSource = fs.readFileSync(path.format(file), 'utf-8');
      const { data } = matter(mdxSource);
      return { title: data.title, date: data.date, slug: file.name };
    });
    return filesMetadata;
  } catch (err) {
    console.error(err);
  }
}
