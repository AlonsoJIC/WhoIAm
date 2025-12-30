# 🔗 Sistema de Link Tracking

## Configuración de Supabase

### 1. Crear cuenta en Supabase (gratis)
Ve a [https://supabase.com](https://supabase.com) y crea una cuenta.

### 2. Crear nuevo proyecto
- Click en "New Project"
- Elige un nombre y contraseña para la base de datos
- Selecciona la región más cercana

### 3. Crear la tabla de tracking
Ve a **SQL Editor** y ejecuta:

```sql
CREATE TABLE link_tracking (
  id BIGSERIAL PRIMARY KEY,
  link_id TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  referer TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  destination_url TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_link_tracking_link_id ON link_tracking(link_id);
CREATE INDEX idx_link_tracking_timestamp ON link_tracking(timestamp DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE link_tracking ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserciones desde la API
CREATE POLICY "Allow anonymous inserts" ON link_tracking
  FOR INSERT TO anon
  WITH CHECK (true);

-- Política para permitir lecturas desde la API
CREATE POLICY "Allow anonymous reads" ON link_tracking
  FOR SELECT TO anon
  USING (true);
```

### 4. Obtener credenciales
Ve a **Settings > API** y copia:
- **Project URL** → `SUPABASE_URL`
- **anon public key** → `SUPABASE_ANON_KEY`

### 5. Configurar variables en Vercel
Ve a tu proyecto en Vercel:
1. **Settings > Environment Variables**
2. Agrega:
   - `SUPABASE_URL` = tu Project URL
   - `SUPABASE_ANON_KEY` = tu anon public key

---

## Uso

### Crear enlaces de tracking

Edita el archivo `api/track/[id].ts` y agrega tus enlaces en `REDIRECT_URLS`:

```typescript
const REDIRECT_URLS: Record<string, string> = {
  'cv': 'https://drive.google.com/tu-cv',
  'github': 'https://github.com/tuusuario',
  'linkedin': 'https://linkedin.com/in/tuusuario',
  'proyecto1': 'https://tu-proyecto.com',
};
```

### URLs de tracking

Tus enlaces serán:
- `https://dev-alonso.vercel.app/r/cv`
- `https://dev-alonso.vercel.app/r/github`
- `https://dev-alonso.vercel.app/r/linkedin`
- `https://dev-alonso.vercel.app/r/proyecto1`

### Ver estadísticas

- **Últimos clicks:** `https://dev-alonso.vercel.app/api/links`
- **Estadísticas:** `https://dev-alonso.vercel.app/api/links?type=stats`

---

## Información capturada

| Campo | Descripción |
|-------|-------------|
| `ip` | Dirección IP del visitante |
| `country` | País (detectado por Vercel) |
| `city` | Ciudad (detectado por Vercel) |
| `region` | Región/Estado |
| `user_agent` | Navegador y dispositivo |
| `referer` | Página desde donde llegó |
| `timestamp` | Fecha y hora exacta |

---

## Ver datos en Supabase

1. Ve a tu proyecto en Supabase
2. Click en **Table Editor**
3. Selecciona la tabla `link_tracking`
4. Verás todos los clicks registrados

También puedes hacer consultas SQL personalizadas:

```sql
-- Clicks por país
SELECT country, COUNT(*) as clicks 
FROM link_tracking 
GROUP BY country 
ORDER BY clicks DESC;

-- Clicks por enlace
SELECT link_id, COUNT(*) as clicks 
FROM link_tracking 
GROUP BY link_id 
ORDER BY clicks DESC;

-- Últimos 10 visitantes
SELECT * FROM link_tracking 
ORDER BY timestamp DESC 
LIMIT 10;
```
