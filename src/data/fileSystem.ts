import type { FileEntry } from '../types'

export const fileSystem: Record<string, FileEntry> = {
  me: {
    id: 'me',
    name: 'me',
    type: 'folder',
    path: '/me',
    icon: 'folder',
    children: ['about-me', 'contact', 'links', 'resume'],
    defaultSize: { width: 550, height: 400 },
    showOnDesktop: true,
    desktopOrder: 0,
  },
  'about-me': {
    id: 'about-me',
    name: 'about-me.md',
    type: 'markdown',
    path: '/me/about-me.md',
    parentId: 'me',
    icon: 'file-text',
    contentModule: () => import('../content/about-me.md?raw'),
    defaultSize: { width: 600, height: 480 },
  },
  projects: {
    id: 'projects',
    name: 'Projects',
    type: 'folder',
    path: '/Projects',
    icon: 'folder',
    children: ['ai-dnd', 'ozkonak-elektrik', 'zu-craft', 'halaqat'],
    defaultSize: { width: 550, height: 400 },
  },
  contact: {
    id: 'contact',
    name: 'contact.txt',
    type: 'text',
    path: '/me/contact.txt',
    parentId: 'me',
    icon: 'file-text',
    contentModule: () => import('../content/contact.txt?raw'),
    defaultSize: { width: 500, height: 360 },
  },
  resume: {
    id: 'resume',
    name: 'resume.pdf',
    type: 'pdf',
    path: '/me/resume.pdf',
    parentId: 'me',
    icon: 'pdf',
    defaultSize: { width: 500, height: 400 },
  },
  links: {
    id: 'links',
    name: 'links.txt',
    type: 'text',
    path: '/me/links.txt',
    parentId: 'me',
    icon: 'globe',
    contentModule: () => import('../content/links.txt?raw'),
    defaultSize: { width: 480, height: 360 },
  },
  'ai-dnd': {
    id: 'ai-dnd',
    name: 'AI DnD',
    type: 'link',
    path: '/Projects/AI DnD',
    parentId: 'projects',
    icon: 'dnd',
    url: 'https://aidnd.safaakyuz.com',
    description: 'AI-powered Dungeons & Dragons web app',
    defaultSize: { width: 480, height: 360 },
    showOnDesktop: true,
    desktopOrder: 1,
  },
  'ozkonak-elektrik': {
    id: 'ozkonak-elektrik',
    name: 'Ozkonak Elektrik',
    type: 'link',
    path: '/Projects/Ozkonak Elektrik',
    parentId: 'projects',
    icon: 'ozkonak',
    url: 'https://ozkonakelektrik.com.tr',
    description: 'Business website for Ozkonak Elektrik',
    defaultSize: { width: 480, height: 360 },
    showOnDesktop: true,
    desktopOrder: 2,
  },
  'zu-craft': {
    id: 'zu-craft',
    name: 'Zu Craft',
    type: 'link',
    path: '/Projects/Zu Craft',
    parentId: 'projects',
    icon: 'zu-craft',
    url: 'https://zucraft.shop',
    description: 'E-commerce storefront for Zu Craft',
    defaultSize: { width: 480, height: 360 },
    showOnDesktop: true,
    desktopOrder: 3,
  },
  halaqat: {
    id: 'halaqat',
    name: 'Halaqat',
    type: 'link',
    path: '/Projects/Halaqat',
    parentId: 'projects',
    icon: 'halaqat',
    url: 'https://halaqat.com.tr',
    description: 'Multi-page PHP app for visualizing hadith transmission networks',
    defaultSize: { width: 480, height: 360 },
    showOnDesktop: true,
    desktopOrder: 4,
  },
}

export function getFileEntry(id: string): FileEntry | undefined {
  return fileSystem[id]
}

export function getChildren(parentId: string): FileEntry[] {
  return Object.values(fileSystem).filter((f) => f.parentId === parentId)
}

export function getDesktopIcons(): FileEntry[] {
  return Object.values(fileSystem)
    .filter((f) => f.showOnDesktop)
    .sort((a, b) => (a.desktopOrder ?? 99) - (b.desktopOrder ?? 99))
}
