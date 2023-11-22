import { ImageBusiness } from "@/configs/theme.config"; // Importe seu tipo de dados aqui

const ImgBusinessFormat: React.FC<ImageBusiness> = ({ image }) => {
  return (
    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden flex justify-center items-center">
      <img
        className="h-32 w-32 bg-purple-50 dark:bg-white rounded-full flex justify-center items-center bg-cover bg-center"
        src={image}
        alt="Imagem de negócio"
      />
    </div>
  );
};

export default ImgBusinessFormat;