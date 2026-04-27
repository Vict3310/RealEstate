import { getProperties } from "../lib/actions";
import FeaturedPropertiesClient from "./FeaturedPropertiesClient";

export default async function FeaturedProperties() {
  const properties = await getProperties();
  
  return <FeaturedPropertiesClient properties={properties} />;
}
