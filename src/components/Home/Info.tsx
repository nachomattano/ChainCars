import RENT from "@/assets/rent.jpg"

export default function Info() {
    return (
        <div className="flex justify-center items-center mt-4">
            <div className="max-w-[150vh] text-white bg-[#1b1b1e] rounded-md my-10 p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-center p-12 space-y-8">
                    <h2 className="text-3xl font-bold">
                        La propiedad de tus sueños ahora tokenizada
                    </h2>
                    <p>
                        Explora un nuevo horizonte en el mercado inmobiliario con nuestra innovadora plataforma de tokenización. Convierte tu visión de la propiedad ideal en una realidad tangible y accesible.
                    </p>
                    </div>
                    <div className="flex justify-center">
                    <img
                        src={RENT.src}
                        alt="Resttfy"
                        className="rounded-md"
                    />
                    </div>
                </div>
            </div>
      </div>
    )
}