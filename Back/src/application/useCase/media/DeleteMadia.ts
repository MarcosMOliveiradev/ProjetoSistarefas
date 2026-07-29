import { unlink } from "node:fs/promises";
import { resolve } from "node:path";
import { MediaRepository } from "../../repositories/MediaRepository.ts";


interface IMediaDelete {
  id: string;
}

export class DeleteMedia {
  constructor(private mediaRepository: MediaRepository) {}

  async execute({ id }: IMediaDelete) {
    const media = await this.mediaRepository.findID(id);

    if (!media) {
      throw new Error("Mídia não encontrada");
    }

    // Pega apenas o nome do arquivo da URL
    // Ex: 844925-FuncaoPROCV.mp4
    const fileName = media.url.split("/").pop();

    if (fileName) {
      // Caminho absoluto da pasta uploads
      const filePath = resolve(process.cwd(), "uploads", fileName);

      try {
        await unlink(filePath);
      } catch (error) {
        console.error("Erro ao deletar arquivo:", error);

        // Se quiser impedir a exclusão do banco quando o arquivo não existir,
        // descomente a linha abaixo:
        // throw new Error("Erro ao deletar arquivo físico");
      }
    }

    await this.mediaRepository.delete(id);
  }
}
