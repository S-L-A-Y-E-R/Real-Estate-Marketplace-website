import Header from "@/components/header";

export default function About() {
  return (
    <>
      <Header />
      <section className="h-[calc(100vh-80px)]">
        <div className="w-2/3 mx-auto translate-y-[5%] md:translate-y-[20%] space-y-7">
          <h3 className="font-bold text-3xl text-center opacity-80">
            About Trend Estate
          </h3>
          <p className="text-center md:text-left leading-10">
            Trend Estate is a leading real estate agency that specializes in
            helping clients buy, sell, and rent properties in the most desirable
            neighborhoods.
            <br />
            Our team of experienced agents is dedicated to providing exceptional
            service and making the buying and selling process as smooth as
            possible. Our mission is to help our clients achieve their real
            estate goals by providing expert advice, personalized service, and a
            deep understanding of the local market.
            <br />
            Whether you are looking to buy, sell, or rent a property, we are
            here to help you every step of the way. Our team of agents has a
            wealth of experience and knowledge in the real estate industry, and
            we are committed to providing the highest level of service to our
            clients. We believe that buying or selling a property should be an
            exciting and rewarding experience, and we are dedicated to making
            that a reality for each and every one of our clients.
          </p>
        </div>
      </section>
    </>
  );
}
