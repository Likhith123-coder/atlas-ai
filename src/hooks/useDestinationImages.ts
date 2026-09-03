import { type SyntheticEvent, useEffect, useState } from 'react'
import { resolveTravelImage } from '../services/images'
import type { Destination } from '../types/travel'

export function useDestinationImages(destinationList: Destination[]) {
  const [imageMap, setImageMap] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false

    async function loadImages() {
      const entries = await Promise.all(
        destinationList.flatMap((destination) => [
          resolveTravelImage(destination.heroQuery, destination.fallbackImage).then((image) => [
            destination.id,
            image,
          ]),
          ...destination.places.map((place, placeIndex) =>
            resolveTravelImage(place.imageQuery, place.fallbackImage).then((image) => [
              `${destination.id}-${placeIndex}`,
              image,
            ]),
          ),
        ]),
      )

      if (!cancelled) {
        setImageMap(Object.fromEntries(entries))
      }
    }

    void loadImages()

    return () => {
      cancelled = true
    }
  }, [destinationList])

  const getDestinationImage = (destination: Destination): string => {
    return imageMap[destination.id] || destination.fallbackImage
  }

  const getPlaceImage = (destinationId: string, placeIndex: number, fallbackImage: string): string => {
    return imageMap[`${destinationId}-${placeIndex}`] || fallbackImage
  }

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>, fallbackImage: string) => {
    const image = event.currentTarget
    if (image.src !== fallbackImage) {
      image.src = fallbackImage
    }
  }

  return {
    imageMap,
    getDestinationImage,
    getPlaceImage,
    handleImageError,
  }
}
