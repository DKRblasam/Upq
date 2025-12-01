import { Request, Response } from "express";
import { ContenidoModel } from "../models/contenido.model";

function getYoutubeId(url: string): string | null {
  const reg = /(?:youtube\.com.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const m = url.match(reg);
  return m ? m[1] : null;
}

export class ContenidoController {
  static async create(req: Request, res: Response) {
    try {
      const { subunidad_id, tipo, titulo, descripcion, url, orden } = req.body;
      let { metadata } = req.body;

      if (!subunidad_id || !tipo || !titulo) {
        return res
          .status(400)
          .json({ message: "subunidad_id, tipo, and titulo are required" });
      }

      if (tipo === "video" && url) {
        const videoId = getYoutubeId(url);
        if (videoId) {
          metadata = {
            video_id: videoId,
            thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            ...metadata,
          };
        }
      } else if (tipo === "documento") {
        // In a real app, you might handle file upload here and extract size/mime
        // For now, we assume metadata is passed or we just store basic info
        if (!metadata) metadata = {};
      }

      const id = await ContenidoModel.create({
        subunidad_id,
        tipo,
        titulo,
        descripcion,
        url,
        metadata,
        orden,
      });
      res.status(201).json({ message: "Contenido created", id });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBySubunidad(req: Request, res: Response) {
    try {
      const { subunidadId } = req.params;
      const contenidos = await ContenidoModel.findAllBySubunidadId(
        Number(subunidadId)
      );
      res.json(contenidos);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { tipo, titulo, descripcion, url, orden } = req.body;
      let { metadata } = req.body;

      if (tipo === "video" && url) {
        const videoId = getYoutubeId(url);
        if (videoId) {
          metadata = {
            video_id: videoId,
            thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            ...metadata,
          };
        }
      }

      const success = await ContenidoModel.update(Number(id), {
        tipo,
        titulo,
        descripcion,
        url,
        metadata,
        orden,
      });

      if (success) {
        res.json({ message: "Contenido updated" });
      } else {
        res.status(404).json({ message: "Contenido not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await ContenidoModel.delete(Number(id));
      if (success) {
        res.json({ message: "Contenido deleted" });
      } else {
        res.status(404).json({ message: "Contenido not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
