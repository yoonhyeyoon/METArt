package com.ssafy.metart.api.event;

import java.util.Arrays;
import java.util.List;
import lombok.Getter;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.protocol.core.methods.response.Log;

@Getter
public class EndSaleEvent {

    private Long saleId;
    private String sellerAddress;
    private String buyerAddress;

    private static final Event END_SALE_EVENT = new Event(
        "EndSale", Arrays.<TypeReference<?>>asList(
        new TypeReference<Uint256>(true) {},
        new TypeReference<Address>(true) {},
        new TypeReference<Address>(true) {}));

    private static final String END_SALE_HASH = EventEncoder.encode(END_SALE_EVENT);

    public static EndSaleEvent getEvent(List<Log> logs) {
        EndSaleEvent event = null;
        for (Log log: logs) {
            String eventHash = log.getTopics().get(0);

            if (eventHash.equals(END_SALE_HASH)) {
                Uint256 saleId = (Uint256) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(1), new TypeReference<Uint256>() {});
                Address sellerAddress = (Address) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(2), new TypeReference<Address>() {});
                Address buyerAddress = (Address) FunctionReturnDecoder.decodeIndexedValue(
                    log.getTopics().get(3), new TypeReference<Address>() {});

                event = new EndSaleEvent();
                event.saleId = saleId.getValue().longValue();
                event.sellerAddress = sellerAddress.getValue();
                event.buyerAddress = buyerAddress.getValue();
            }
        }

        return event;
    }

}
