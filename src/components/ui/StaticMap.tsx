import React from 'react';

interface StaticMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  width?: string | number;
  height?: string | number;
}

export function StaticMap({ lat, lng, zoom = 16, width = '100%', height = '100%' }: StaticMapProps) {
  // Constantes de OSM
  const TILE_SIZE = 256;

  // Cálculos de proyección Web Mercator
  const x = ((lng + 180) / 360) * Math.pow(2, zoom);
  const y = ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * Math.pow(2, zoom);

  const tileX = Math.floor(x);
  const tileY = Math.floor(y);
  
  const offsetX = (x - tileX) * TILE_SIZE;
  const offsetY = (y - tileY) * TILE_SIZE;

  // Queremos cargar un grid de 3x3 tiles alrededor del tile central
  const tiles = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      tiles.push({
        x: tileX + dx,
        y: tileY + dy,
        key: `${zoom}-${tileX + dx}-${tileY + dy}`
      });
    }
  }

  return (
    <div 
      style={{ 
        width, 
        height, 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#e5e3df' // Color típico de fondo de mapas
      }}
    >
      {/* Contenedor que se desplaza para que el centro (lat,lng) quede en el centro del div (50%, 50%) */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(${-offsetX - TILE_SIZE}px, ${-offsetY - TILE_SIZE}px)`, // -TILE_SIZE para compensar el grid 3x3 que empieza en -1,-1
          width: TILE_SIZE * 3,
          height: TILE_SIZE * 3
        }}
      >
        {tiles.map((t, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <img
              key={t.key}
              src={`https://tile.openstreetmap.org/${zoom}/${t.x}/${t.y}.png`}
              crossOrigin="anonymous"
              style={{
                position: 'absolute',
                left: col * TILE_SIZE,
                top: row * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
                objectFit: 'cover'
              }}
              alt=""
            />
          );
        })}
      </div>

      {/* Marcador rojo en el centro exacto */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -100%)', // El pin apunta a la base
          zIndex: 10
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="#ef4444" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3" fill="white"></circle>
        </svg>
      </div>
    </div>
  );
}
