import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import useDiscount from "../../hooks/useCartCalculations";
import { styled } from "@mui/material/styles";

const StyledListItem = styled(ListItem)(() => ({
  paddingTop: 8,
  paddingBottom: 8,
  paddingLeft: 0,
  paddingRight: 0,
}));

const Title = styled(Typography)(() => ({
  marginTop: 16,
}));

const Review = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { discount } = useDiscount();

  const totalWithoutDiscount = cartItems.reduce(
    (total, product) =>
      total + parseFloat(product.product.price) * product.quantity,
    0
  );

  const discountedTotal =
    discount && discount.discount
      ? totalWithoutDiscount -
        (totalWithoutDiscount * parseFloat(discount.discount)) / 100
      : totalWithoutDiscount;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      <List disablePadding>
        {cartItems.map((product) => (
          <StyledListItem key={product.product.id}>
            <ListItemText
              primary={product.product?.title}
              secondary={product.product.description}
            />

            <Typography variant="body2">
              {product.quantity} {" x "}€{" "}
              {`${(product.product.price * product.quantity).toFixed(2)}`}
            </Typography>
          </StyledListItem>
        ))}

        <StyledListItem>
          <ListItemText primary="Sub Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            € {totalWithoutDiscount.toFixed(2)}
          </Typography>
        </StyledListItem>

        <StyledListItem>
          <ListItemText primary="Discount" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {discount.discount}%
          </Typography>
        </StyledListItem>

        <StyledListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            € {discountedTotal.toFixed(2)}
          </Typography>
        </StyledListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Title variant="h6" gutterBottom>
            Shipping
          </Title>

          <Typography gutterBottom>The Granary</Typography>

          <Typography gutterBottom>
            The Granary, Kingston House Estate, Kingston Bagpuize, Abingdon,
            Oxfordshire OX13 5AX, UK
          </Typography>
        </Grid>

        <Grid item container direction="column" xs={12} sm={6}>
          <Title variant="h6" gutterBottom>
            Payment details
          </Title>

          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Card type</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Visa</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Card holder</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>James Alexander Gale</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Card number</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>xxxx-xxxx-xxxx-1234</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Expiry date</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>04/2024</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Review;
