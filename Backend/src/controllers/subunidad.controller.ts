import { Request, Response } from "express";
import { SubunidadModel } from "../models/subunidad.model";

export class SubunidadController {
  static async create(req: Request, res: Response) {
    try {
      const { unidad_id, titulo, descripcion, orden } = req.body;

      if (!unidad_id || !titulo) {
        return res
          .status(400)
          .json({ message: "unidad_id and titulo are required" });
      }

      // TODO: Add permission check here (teach/adm/superadm)

      const id = await SubunidadModel.create({
        unidad_id,
        titulo,
        descripcion,
        orden,
      });
      res.status(201).json({ message: "Subunidad created", id });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getByUnidad(req: Request, res: Response) {
    try {
      const { unidadId } = req.params;
      const subunidades = await SubunidadModel.findAllByUnidadId(
        Number(unidadId)
      );
      res.json(subunidades);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { titulo, descripcion, orden } = req.body;

      // TODO: Add permission check here

      const success = await SubunidadModel.update(Number(id), {
        titulo,
        descripcion,
        orden,
      });
      if (success) {
        res.json({ message: "Subunidad updated" });
      } else {
        res.status(404).json({ message: "Subunidad not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // TODO: Add permission check here

      const success = await SubunidadModel.delete(Number(id));
      if (success) {
        res.json({ message: "Subunidad deleted" });
      } else {
        res.status(404).json({ message: "Subunidad not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
