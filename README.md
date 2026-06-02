## MLN131 Quiz Room (Supabase Realtime)

Project Next.js App Router cho quiz game + room multiplayer.

### 1) Cài dependency

```bash
npm install
```

### 2) Cấu hình môi trường

Tạo file `.env.local` (không commit) và thêm:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

- `NEXT_PUBLIC_*`: dùng cho client subscribe realtime.
- `SUPABASE_SERVICE_ROLE_KEY`: khuyen nghi cho production.
- Neu chua co service role key, server se tam fallback sang `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` de ban test nhanh.

### 3) Tạo bảng Supabase cho room state

Mở **Supabase SQL Editor**, chạy file `supabase/quiz_rooms.sql`.

File này tạo:
- Bảng `quiz_rooms` (`code`, `state`, `created_at`, `updated_at`)
- Trigger tự cập nhật `updated_at`
- Bật Realtime cho bảng `quiz_rooms`

### 4) Chạy local

```bash
npm run dev
```

Mở `http://localhost:3000/room`.

### 5) Luồng realtime đã tích hợp

- Server API đọc/ghi room state trực tiếp vào Supabase (`lib/server/room-store.ts`)
- Client room subscribe `postgres_changes` để cập nhật gần realtime (`components/room/useRoomPoll.ts`)
- Vẫn có polling 3s làm fallback khi mạng không ổn định

### 6) Deploy Vercel (bat buoc neu tao phong tren production)

Vao **Vercel → Project → Settings → Environment Variables**, them cho **Production**:

| Bien | Vi du |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | key `sb_publishable_...` hoac `anon` key |
| `SUPABASE_SERVICE_ROLE_KEY` | key `service_role` (khuyen nghi) |

Sau do **Redeploy**. Neu thieu bien, nut "Tao phong" se loi 500 va khong vao duoc phong.

Kiem tra nhanh API:

```bash
curl -X POST https://YOUR-APP.vercel.app/api/room \
  -H "Content-Type: application/json" \
  -d "{\"hostName\":\"Test\"}"
```

Phai tra ve JSON co `code` va `playerId`, khong phai HTTP 500.
