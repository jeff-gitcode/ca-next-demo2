import { render } from "@testing-library/react";
import { Container } from "inversify";

import { ApplicationProvider } from "./applicationProvider";

export function nextRender(ui: React.ReactNode) {
    const myContainer = new Container();
    return render(<ApplicationProvider container={myContainer}>{ui}</ApplicationProvider>);
}

// import { Container } from "inversify";
// import { ApplicationProvider } from "./applicationProvider";

// const myContainer = new Container();

// export const ApplicationProviderMock = ({
//     children }: Readonly<{
//         children: React.ReactNode;
//     }>
// ) => {
//     return (
//         <ApplicationProvider container={myContainer}>
//             {children}
//         </ApplicationProvider>
//     );
// };

