"use server";

import { prisma } from "./prisma";

export async function getProperties() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return properties.map(p => ({
      ...p,
      gallery: JSON.parse(p.gallery)
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export async function getPropertyById(id) {
  try {
    const property = await prisma.property.findUnique({
      where: { id }
    });
    if (!property) return null;
    return {
      ...property,
      gallery: JSON.parse(property.gallery)
    };
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export async function getArticles() {
  try {
    return await prisma.journalArticle.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getTeamMembers() {
  try {
    return await prisma.teamMember.findMany({
      orderBy: { createdAt: 'asc' }
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export async function createInquiry(data) {
  try {
    return await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message
      }
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    throw new Error("Failed to send inquiry.");
  }
}

export async function subscribeNewsletter(email) {
  try {
    return await prisma.newsletterSubscriber.create({
      data: { email }
    });
  } catch (error) {
    if (error.code === 'P2002') {
       // Already subscribed
       return { success: true, alreadySubscribed: true };
    }
    console.error("Error subscribing to newsletter:", error);
    throw new Error("Failed to subscribe.");
  }
}

export async function searchProperties(query) {
  if (!query || query.length < 2) return [];
  try {
    const properties = await prisma.property.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { location: { contains: query } },
          { description: { contains: query } },
        ],
      },
      take: 5
    });
    return properties.map(p => ({
      ...p,
      gallery: JSON.parse(p.gallery)
    }));
  } catch (error) {
    console.error("Error searching properties:", error);
    return [];
  }
}

